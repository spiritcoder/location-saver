import { body } from 'express-validator';

//validates signup data to make sure it makes sense
export const signUpValidator = [
    body('email').isEmail().withMessage('Email is required'),
    body('name').isString().withMessage('Name is required'),
    body('password').trim().isLength({ min: 4, max: 20 })
]

//validates log in data to make sure they make sense
export const logInValidator = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').trim().isLength({ min: 4, max: 20 })
]