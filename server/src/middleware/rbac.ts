import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { AppError } from './errorHandler';

type Role = 'ADMIN' | 'SUPERVISOR' | 'MONITOR' | 'OPERATOR' | 'VISITOR';

export const authorize = (...roles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (!roles.includes(req.user.role as Role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

// Role-based middleware presets
export const adminOnly = authorize('ADMIN');
export const supervisorOrAbove = authorize('ADMIN', 'SUPERVISOR');
export const monitorOrAbove = authorize('ADMIN', 'SUPERVISOR', 'MONITOR');
export const operatorOrAbove = authorize('ADMIN', 'SUPERVISOR', 'MONITOR', 'OPERATOR');
