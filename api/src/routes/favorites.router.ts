// Libs
import { Router } from "express";
import asyncHandler from 'express-async-handler';
// Controllers
import { FavoritesController } from './../controllers/favorites.controller';
// Middlewares
import { validatorHandler } from "../middlewares/validator.handler";
import { unAuthorized } from "../middlewares/auth.handler";
// Schemas
import { getFavoritesSchema, getFavoritesByFilterSchema } from '../schemas/favorites.schema';

const router = Router();

const { getFavorites, addMovieToFavorites, removeMovieOfFavorites } = new FavoritesController();

router.get('/', unAuthorized, validatorHandler(getFavoritesByFilterSchema, 'query'), asyncHandler(getFavorites));

router.post('/:movieId', unAuthorized, validatorHandler(getFavoritesSchema, 'params'), asyncHandler(addMovieToFavorites));

router.delete('/:movieId', unAuthorized, validatorHandler(getFavoritesSchema, 'params'), asyncHandler(removeMovieOfFavorites));

export { router as favoritesRouter };
