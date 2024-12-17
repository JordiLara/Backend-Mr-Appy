import { check, body } from 'express-validator';

export const idValidator = [
    check('id').isInt().withMessage('Invalid ID')
]

export const nameValidator = [
    body('name').isString().withMessage('Invalid Name file')
]

