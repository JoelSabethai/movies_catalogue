// Libs
import { Router } from "express";
import asyncHandler from 'express-async-handler';
// Controllers
import { AuthController } from './../controllers/auth.controller';
// Middlewares
import { validatorHandler } from "../middlewares/validator.handler";
import { unAuthorized } from "../middlewares/auth.handler";
// Schemas
import { logInSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();

const { validateToken, logIn, register, logout } = new AuthController();

router.get('/validate-token', unAuthorized, asyncHandler(validateToken));

router.post('/login', validatorHandler(logInSchema, 'body'), asyncHandler(logIn));

router.post('/register', validatorHandler(registerSchema, 'body'), asyncHandler(register));

router.post('/logout', unAuthorized, asyncHandler(logout));

export { router as authRouter };
