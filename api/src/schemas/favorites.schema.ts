// Libs
import Joi from 'joi/lib';

const movieId = Joi.string();
const page = Joi.string();
const searchQuery = Joi.string();

/**
 * Schema for getting favorites movies from its id.
 */
export const getFavoritesSchema: Joi.ObjectSchema = Joi.object({
    movieId: movieId.required(),
});

/**
 * Schema for getting filtered favorites movies
 */
export const getFavoritesByFilterSchema: Joi.ObjectSchema = Joi.object({
    page: page.required(),
    searchQuery: searchQuery.optional().allow(''),
})