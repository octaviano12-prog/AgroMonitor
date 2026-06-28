import { Router } from 'express';
import { equipmentController } from './controller';
import { authorize } from '../../middleware/rbac';

const router = Router();

/**
 * @swagger
 * /api/equipment:
 *   get:
 *     summary: Get all equipment
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of equipment
 */
router.get('/', equipmentController.getWithFilters);
router.get('/all', equipmentController.getAll);

/**
 * @swagger
 * /api/equipment/fleet/{fleet}:
 *   get:
 *     summary: Get equipment by fleet number
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fleet
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Equipment details
 */
router.get('/fleet/:fleet', equipmentController.getByFleet);

/**
 * @swagger
 * /api/equipment/{id}:
 *   get:
 *     summary: Get equipment by ID
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 */
router.get('/:id', equipmentController.getById);

/**
 * @swagger
 * /api/equipment:
 *   post:
 *     summary: Create new equipment
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authorize('ADMIN', 'SUPERVISOR'), equipmentController.create);

/**
 * @swagger
 * /api/equipment/{id}:
 *   put:
 *     summary: Update equipment
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 */
router.put('/:id', authorize('ADMIN', 'SUPERVISOR'), equipmentController.update);

/**
 * @swagger
 * /api/equipment/{id}:
 *   delete:
 *     summary: Delete equipment
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authorize('ADMIN'), equipmentController.delete);

/**
 * @swagger
 * /api/equipment/{id}/status:
 *   patch:
 *     summary: Update equipment status
 *     tags: [Equipment]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/:id/status', equipmentController.updateStatus);

export { router as equipmentRoutes };
