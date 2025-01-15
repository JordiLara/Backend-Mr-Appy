import {body} from "express-validator"

export const createReviewValidator = [
  body("mood")
    .exists()
    .withMessage("El estado de ánimo (mood) es obligatorio")
    .isInt({ min: 1, max: 5 })
    .withMessage("El estado de ánimo debe ser un número entre 1 y 5"),
  body("content")
    .exists()
    .withMessage("El contenido debe ser una cadena de texto")
    .isLength({max: 500})
    .withMessage("El contenido no debe exceder los 500 caracteres"),
    body("isAnonymous")
    .optional()
    .isBoolean()
    .withMessage("El valor de isAnonymous debe ser booleano"),
];