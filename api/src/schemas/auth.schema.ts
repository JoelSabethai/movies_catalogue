// Libs
import Joi from 'joi/lib';

const email = Joi.string().email();
const password = Joi.string();

/**
 * Schema for login.
 */
export const logInSchema: Joi.ObjectSchema = Joi.object({
    email: email.required(),
    password: password.required(),
});

/**
 * Schema for register a new user.
 */
export const registerSchema: Joi.ObjectSchema = logInSchema