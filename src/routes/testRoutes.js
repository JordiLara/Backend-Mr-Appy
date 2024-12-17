// src/routes/userRoutes.js
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { allAccess, userBoard, moderatorBoard, adminBoard } from '../controllers/testController.js';

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/all', allAccess);
router.get('/user', authenticateToken(['user']), userBoard);
router.get('/mod', authenticateToken(['mod','admin']), moderatorBoard);
router.get('/admin', authenticateToken(['admin']), adminBoard);

export default router;