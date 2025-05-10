// Libs
import { badRequest, notFound, internal, isBoom } from '@hapi/boom';
// Middleware
import { log } from '../middlewares/logger';
// Models
import { Favorites } from '../db/models/favorites.model';
// Services
import { MoviesService } from './movies.service';

const moviesService = new MoviesService();

export class FavoritesService {
    /**
     * Get all favorite movies from "MongoDB" paginated and by search param
     * @param {number} page - Number of page to get movies
     * @param {string} userId - Id of user to search favorite movies
     * @param {string} searchQuery - Optional value to search movies by params/query
     * @throws Conflict if can't get favorite movies and generate log of error
     * @returns A object with movies by page
     */
    async getFavorites(page: number, userId: string, searchQuery?: string): Promise<IFavoritesResponse> {
        try {
            const limit = 20;
            const skip = (page - 1) * limit;

            let pipeline: any[] = [{ $match: { user: userId } }];
            if(searchQuery && searchQuery.length > 0) {
                pipeline.push({
                    $project: {
                        filteredMovies: {
                        $filter: {
                            input: "$movies",
                            as: "movie",
                            cond: {
                                $regexMatch: {
                                    input: { $toLower: "$$movie.title" },
                                    regex: searchQuery.toLowerCase(),
                                },
                            },
                        },
                        },
                    },
                });
                pipeline.push({
                    $project: {
                        total_results: { $size: "$filteredMovies" },
                        results: { $slice: ["$filteredMovies", skip, limit] },
                    },
                });
            } else {
                pipeline.push({
                    $project: {
                        total_results: { $size: "$movies" },
                        results: { $slice: ["$movies", skip, limit] },
                    },
                });
            }

            pipeline.push(
                {
                    $addFields: {
                        page: page,
                        total_pages: {
                            $ceil: { $divide: ["$total_results", limit] },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        page: 1,
                        results: 1,
                        total_pages: 1,
                        total_results: 1,
                    },
                }
            );
        
            const rawData = await Favorites.aggregate(pipeline) as unknown as [IFavoritesResponse];
            const data = rawData[0] ?? {
                page,
                results: [],
                total_pages: 0,
                total_results: 0,
            };

            

            return data;
        } catch (error) {
            log.error('Error getting favorites:', error);
            throw internal('Error al obtener favoritos');
        }
    }

    /**
     * Add a movie to favorites
     * @param {number} movieId - ID of movie to add to favorite movies
     * @param {string} userId - Id of user to search favorite movies
     * @throws Conflict if can't add movie to favorites and generate log of error
     */
    async addToFavorites(movieId: number, userId: string): Promise<void> {
        try {
            const exists = await Favorites.exists({
                user: userId,
                'movies.id': movieId
            });
        
            if (exists)
                throw badRequest('La película ya está en favoritos');

            const movie = await moviesService.getMovie(movieId, userId);
            if (!movie)
                throw notFound('Película no encontrada');

            const movieWithFavorite = {
                ...movie,
                favorite: true,
            };

            await Favorites.updateOne(
                { user: userId },
                { $push: { movies: movieWithFavorite } },
                { upsert: true }
            );
        } catch (error) {
            log.error('Error adding to favorites:', error);
            
            if(isBoom(error)) throw error;
            throw internal('Error al agregar película a favoritos');
        }
    }

    /**
     * Remove a movie of favorites
     * @param {number} movieId - ID of movie to add to favorite movies
     * @param {string} userId - Id of user to search favorite movies
     * @throws Conflict if can't remove movie of favorites and generate log of error
     */
    async removeOfFavorites(movieId: number, userId: string): Promise<void> {
        try {
            const result = await Favorites.updateOne(
                { user: userId },
                { $pull: { movies: { id: movieId } }}
            );

            if(result.modifiedCount === 0)
                throw notFound('Película no encontrada en favoritos');
        } catch (error) {
            log.error('Error removing from favorites:', error);

            if(isBoom(error)) throw error;
            throw internal('Error al eliminar película de favoritos');
        }
        
    }
}