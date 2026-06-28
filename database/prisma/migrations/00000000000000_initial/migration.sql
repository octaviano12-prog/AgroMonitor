-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'SUPERVISOR', 'MONITOR', 'OPERATOR', 'VISITOR') NOT NULL DEFAULT 'OPERATOR',
    `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
    `avatar` VARCHAR(191) NULL,
    `refreshToken` VARCHAR(191) NULL,
    `lastLogin` DATETIME(3) NULL,
    `twoFactorEnabled` BOOLEAN NOT NULL DEFAULT false,
    `twoFactorSecret` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_email_idx`(`email`),
    INDEX `User_role_idx`(`role`),
    INDEX `User_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RefreshToken_token_key`(`token`),
    INDEX `RefreshToken_token_idx`(`token`),
    INDEX `RefreshToken_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Farm` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `area` DOUBLE NOT NULL,
    `responsible` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Farm_name_idx`(`name`),
    INDEX `Farm_city_state_idx`(`city`, `state`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plot` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `area` DOUBLE NOT NULL,
    `crop` VARCHAR(191) NOT NULL,
    `status` ENUM('CULTIVATION', 'HARVEST', 'PREPARATION', 'FALLOW') NOT NULL DEFAULT 'FALLOW',
    `farmId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Plot_code_idx`(`code`),
    INDEX `Plot_farmId_idx`(`farmId`),
    UNIQUE INDEX `Plot_code_farmId_key`(`code`, `farmId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Front` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `supervisor` VARCHAR(191) NOT NULL,
    `area` DOUBLE NOT NULL DEFAULT 0,
    `status` ENUM('ACTIVE', 'PAUSED', 'COMPLETED') NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Front_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipment` (
    `id` VARCHAR(191) NOT NULL,
    `fleet` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `hourMeter` DOUBLE NOT NULL DEFAULT 0,
    `plate` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `status` ENUM('ONLINE', 'OFFLINE', 'WORKING', 'MAINTENANCE') NOT NULL DEFAULT 'OFFLINE',
    `speed` DOUBLE NOT NULL DEFAULT 0,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `lastUpdate` DATETIME(3) NULL,
    `photo` VARCHAR(191) NULL,
    `availability` DOUBLE NOT NULL DEFAULT 0,
    `efficiency` DOUBLE NOT NULL DEFAULT 0,
    `operatorId` VARCHAR(191) NULL,
    `frontId` VARCHAR(191) NULL,
    `farmId` VARCHAR(191) NULL,
    `plotId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Equipment_fleet_key`(`fleet`),
    INDEX `Equipment_fleet_idx`(`fleet`),
    INDEX `Equipment_status_idx`(`status`),
    INDEX `Equipment_operatorId_idx`(`operatorId`),
    INDEX `Equipment_frontId_idx`(`frontId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EquipmentDocument` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `equipmentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `EquipmentDocument_equipmentId_idx`(`equipmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Operator` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `registration` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `shift` ENUM('DAY', 'NIGHT', 'ROTATING') NOT NULL DEFAULT 'DAY',
    `supervisor` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `hoursWorked` DOUBLE NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Operator_cpf_key`(`cpf`),
    UNIQUE INDEX `Operator_registration_key`(`registration`),
    UNIQUE INDEX `Operator_userId_key`(`userId`),
    INDEX `Operator_cpf_idx`(`cpf`),
    INDEX `Operator_registration_idx`(`registration`),
    INDEX `Operator_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimelineEvent` (
    `id` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `type` ENUM('START', 'MOVE', 'WORK', 'STOP', 'ALERT', 'END') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `details` JSON NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `equipmentId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TimelineEvent_equipmentId_idx`(`equipmentId`),
    INDEX `TimelineEvent_time_idx`(`time`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CsvImport` (
    `id` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `filePath` VARCHAR(191) NOT NULL,
    `totalRows` INTEGER NOT NULL DEFAULT 0,
    `processedRows` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `columnMapping` JSON NULL,
    `errors` JSON NULL,
    `uploadedBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CsvImport_status_idx`(`status`),
    INDEX `CsvImport_uploadedBy_idx`(`uploadedBy`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `type` ENUM('ALERT', 'INFO', 'WARNING', 'SUCCESS') NOT NULL DEFAULT 'INFO',
    `read` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Notification_userId_idx`(`userId`),
    INDEX `Notification_read_idx`(`read`),
    INDEX `Notification_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `format` ENUM('PDF', 'EXCEL', 'CSV', 'WORD') NOT NULL,
    `status` ENUM('READY', 'GENERATING', 'FAILED') NOT NULL DEFAULT 'GENERATING',
    `filePath` VARCHAR(191) NULL,
    `dateRange` JSON NULL,
    `filters` JSON NULL,
    `scheduledAt` DATETIME(3) NULL,
    `frequency` VARCHAR(191) NULL,
    `recipients` JSON NULL,
    `generatedBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Report_type_idx`(`type`),
    INDEX `Report_status_idx`(`status`),
    INDEX `Report_generatedBy_idx`(`generatedBy`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `entity` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NULL,
    `changes` JSON NULL,
    `userId` VARCHAR(191) NOT NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AuditLog_entity_entityId_idx`(`entity`, `entityId`),
    INDEX `AuditLog_userId_idx`(`userId`),
    INDEX `AuditLog_action_idx`(`action`),
    INDEX `AuditLog_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Occurrence` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'open',
    `priority` VARCHAR(191) NOT NULL DEFAULT 'medium',
    `assignedTo` VARCHAR(191) NULL,
    `comments` JSON NULL,
    `photos` JSON NULL,
    `resolvedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Occurrence_status_idx`(`status`),
    INDEX `Occurrence_type_idx`(`type`),
    INDEX `Occurrence_priority_idx`(`priority`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Plot` ADD CONSTRAINT `Plot_farmId_fkey` FOREIGN KEY (`farmId`) REFERENCES `Farm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipment` ADD CONSTRAINT `Equipment_operatorId_fkey` FOREIGN KEY (`operatorId`) REFERENCES `Operator`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipment` ADD CONSTRAINT `Equipment_frontId_fkey` FOREIGN KEY (`frontId`) REFERENCES `Front`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipment` ADD CONSTRAINT `Equipment_farmId_fkey` FOREIGN KEY (`farmId`) REFERENCES `Farm`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Equipment` ADD CONSTRAINT `Equipment_plotId_fkey` FOREIGN KEY (`plotId`) REFERENCES `Plot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquipmentDocument` ADD CONSTRAINT `EquipmentDocument_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `Equipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Operator` ADD CONSTRAINT `Operator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimelineEvent` ADD CONSTRAINT `TimelineEvent_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `Equipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_generatedBy_fkey` FOREIGN KEY (`generatedBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

