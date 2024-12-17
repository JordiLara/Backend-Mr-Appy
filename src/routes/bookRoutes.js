// src/routes/userRoutes.js
import { Router } from 'express';
import { getBooks, getBookById, addBook, updateBook, deleteBook } from '../controllers/bookController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { bookValidator } from '../validations/book.Validation.js';
import { idValidator } from '../validations/generic.Validation.js'

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/', authenticateToken(['user']), getBooks);
router.get('/:id', authenticateToken(['user','mod','admin']), idValidator, getBookById);
router.post('/', authenticateToken(['user','mod','admin']), bookValidator, addBook);
router.patch('/:id', authenticateToken(['user','mod','admin']), idValidator, bookValidator, updateBook);
router.delete('/:id', authenticateToken(['user','mod','admin']), idValidator, deleteBook);
router.get('/top-ventas', getBooks);

export default router;
