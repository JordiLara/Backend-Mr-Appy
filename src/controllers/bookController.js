import Book from '../models/bookModel.js';
import { validationResult } from 'express-validator';

export const getBooks = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Obtener todos los usuarios de la base de datos
    const books = await Book.findAll();

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'Books List',
      data: books
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al obtener los libros',
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Buscar un usuario por su ID en la base de datos
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        code: -6,
        message: 'Libro no encontrado'
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'Book Detail',
      data: book
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al obtener el libro'
    });
  }
};

export const addBook = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, year } = req.body;
    let newBook;
    try {
      newBook = await Book.create({ title: title, year: year, user_id: req.user.id_user });
    } catch (error) {
      // Si hay un error de duplicación de clave única (por ejemplo, título duplicado)
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
          code: -61,
          message: 'Duplicate Book Title'
        });
      }
    }

    if (!newBook) {
      return res.status(404).json({
        code: -6,
        message: 'Error When Adding The Book'
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'Book Added Successfully',
      data: newBook
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al añadir el libro'
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, year } = req.body;

    // Buscar un usuario por su ID en la base de datos
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        code: -3,
        message: 'Book no encontrado'
      });
    }

    // Actualizar el correo electrónico y la contraseña del usuario
    book.title = title;
    book.year = year;
    await book.save();

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'Book Updated Successfully',
      data: book
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al actualizar el libro'
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Buscar un libro por su ID en la base de datos y eliminarlo
    const deletedBook = await Book.destroy({ where: { id_book: id } });

    // Verificar si el libro fue encontrado y eliminado
    if (!deletedBook) {
      return res.status(404).json({
        code: -100,
        message: 'Book Not Found'
      });
     }
 
    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'Book Deleted Successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al eliminar el libro'
    });
  }
};