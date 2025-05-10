// Libs
import { Router } from "express";
import asyncHandler from 'express-async-handler';
// Controllers
import { MoviesController } from './../controllers/movies.controller';
// Middlewares
import { validatorHandler } from "../middlewares/validator.handler";
import { unAuthorized } from "../middlewares/auth.handler";
// Schemas
import { getMovieSchema, getMovieByFilterSchema } from '../schemas/movies.schema';

const router = Router();

const { getAllMovies, getMovie, getConfigurationDetails } = new MoviesController();

router.get('/configuration/details', unAuthorized, asyncHandler(getConfigurationDetails));

router.get('/', unAuthorized, validatorHandler(getMovieByFilterSchema, 'query'), asyncHandler(getAllMovies));

router.get('/:movieId', unAuthorized, validatorHandler(getMovieSchema, 'params'), asyncHandler(getMovie));

export { router as moviesRouter };
