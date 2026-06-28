import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../../config';
import { userRepository } from './repository';
import { RegisterInput } from '../../validators/auth';
import { AppError } from '../../middleware/errorHandler';

export class AuthService {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    if (user.status !== 'ACTIVE') {
      throw new AppError('Account is not active', 403);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const tokens = this.generateTokens(user.id, user.email, user.role);

    await userRepository.updateRefreshToken(user.id, tokens.refreshToken);
    await userRepository.updateLastLogin(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  async register(data: RegisterInput) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError('Email already registered', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const tokens = this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    const storedToken = await userRepository.findRefreshToken(refreshToken);

    if (!storedToken) {
      throw new AppError('Invalid refresh token', 401);
    }

    if (storedToken.expiresAt < new Date()) {
      await userRepository.deleteRefreshToken(refreshToken);
      throw new AppError('Refresh token expired', 401);
    }

    const user = await userRepository.findById(storedToken.userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await userRepository.deleteRefreshToken(refreshToken);

    const tokens = this.generateTokens(user.id, user.email, user.role);
    await userRepository.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await userRepository.findByEmail(
      (await userRepository.findById(userId))?.email || ''
    );

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      throw new AppError('Current password is incorrect', 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await userRepository.updatePassword(userId, hashedPassword);

    return { message: 'Password changed successfully' };
  }

  async logout(userId: string) {
    await userRepository.updateRefreshToken(userId, '');
    return { message: 'Logged out successfully' };
  }

  private generateTokens(userId: string, email: string, role: string) {
    const accessTokenOptions: SignOptions = {
      expiresIn: config.jwt.expiresIn as SignOptions['expiresIn'],
    };
    const refreshTokenOptions: SignOptions = {
      expiresIn: config.jwt.refreshExpiresIn as SignOptions['expiresIn'],
    };

    const accessToken = jwt.sign(
      { id: userId, email, role },
      config.jwt.secret,
      accessTokenOptions
    );

    const refreshToken = jwt.sign(
      { id: userId },
      config.jwt.refreshSecret,
      refreshTokenOptions
    );

    // Store refresh token in database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    userRepository.saveRefreshToken(refreshToken, userId, expiresAt);

    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
