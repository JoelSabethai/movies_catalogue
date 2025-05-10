// Libs
import Joi from 'joi/lib';

const movieId = Joi.string();
const page = Joi.string();
const searchQuery = Joi.string();

/**
 * Schema for getting movie from its id.
 */
export const getMovieSchema: Joi.ObjectSchema = Joi.object({
    movieId: movieId.required(),
});

/**
 * Schema for getting filtered movies
 */
export const getMovieByFilterSchema: Joi.ObjectSchema = Joi.object({
    page: page.required(),
    searchQuery: searchQuery.optional().allow(''),
})