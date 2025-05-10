// Libs
import axios from 'axios';
import { badRequest, internal } from '@hapi/boom';
// Models
import { Favorites } from '../db/models/favorites.model';
// Middleware
import { log } from '../middlewares/logger';
// Config
import { env } from '../config';

export class MoviesService {
    /**
     * Check favorite movies to find a movie by user in "MongoDB"
     * @param {string} userId - Id of user to search favorite movie
     * @param {number} movieId - Id movie to search favorite movie
     * @throws Conflict if can't consult favorite movies and generate log of error
     * @returns A boolean value to validate if exist movie in favorites
     */
    async movieInFavorites(userId: string, movieId: number): Promise<boolean> {
        try {
            const movieExist = await Favorites.exists({ user: userId, "movies.id": movieId })

            return !!movieExist;
        } catch (error) {
            log.error('Error consulting favorites:', error);
            throw internal('Error consultar película en favoritos');
        }
    }

    /**
     * Get all movies from "TMDB" paginated and by search param
     * @param {number} page - Number of page to get movies
     * @param {string} userId - Id of user in session
     * @param {string} searchQuery - Optional value to search movies by params/query
     * @throws Conflict if can't get movies and generate log of error
     * @returns A object with movies by page
     */
    async getAllMovies(page: number, userId: string, searchQuery?: string): Promise<IMoviesResponse> {
        try {
            if(searchQuery && searchQuery.length > 0) {
                const { data: dataResponse } = await axios({
                    method: 'GET',
                    url: `${env.tmdbBaseUrl}/search/movie?language=es-MX&page=${page}&query=${searchQuery}`,
                    headers: {
                        'Accept': 'application/json',
                        Authorization: `Bearer ${env.tmdbApiKey}`,
                    },
                });

                const movies = await Promise.all(
                    dataResponse.results.map(async (movie: IMoviesResults) => {
                        const isFavorite = await this.movieInFavorites(userId, movie.id);
                        
                        return {
                            ...movie,
                            favorite: isFavorite
                        }
                    })
                )

                const data = {
                    ...dataResponse,
                    results: movies
                }

                return data;
            } else {
                const { data: dataResponse } = await axios({
                    method: 'GET',
                    url: `${env.tmdbBaseUrl}/movie/popular?language=es-MX&page=${page}`,
                    headers: {
                        'Accept': 'application/json',
                        Authorization: `Bearer ${env.tmdbApiKey}`,
                    },
                });

                const movies = await Promise.all(
                    dataResponse.results.map(async (movie: IMoviesResults) => {
                        const isFavorite = await this.movieInFavorites(userId, movie.id);
                        
                        return {
                            ...movie,
                            favorite: isFavorite
                        }
                    })
                )

                const data = {
                    ...dataResponse,
                    results: movies
                }

                return data;
            }
        } catch (error) {
            log.error(`Error getting movies: ${error}`);
            throw badRequest('Error al obtener películas')
        }
    }

    /**
     * Get a movie details from "TMDB"
     * @param {number} movieId - ID of movie to get details
     * @param {string} userId - Id of user in session
     * @throws Conflict if can't get movie details and generate log of error
     * @returns A object with movie details
     */
    async getMovie(movieId: number, userId: string): Promise<IMovieResponse> {
        try {
            const { data: dataResponse } = await axios({
                method: 'GET',
                url: `${env.tmdbBaseUrl}/movie/${movieId}?language=es-MX`,
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${env.tmdbApiKey}`,
                },
            });

            const isFavorite = await this.movieInFavorites(userId, movieId);
            const data: IMovieResponse = {
                ...dataResponse,
                favorite: isFavorite
            }

            return data;
        } catch (error) {
            log.error(`Error getting movie details: ${error}`);
            throw badRequest('Error al obtener los detalles de una película')
        }
    }

    /**
     * Get a configuration details from "TMDB"
     * @throws Conflict if can't get configuration details and generate log of error
     * @returns A object with configuration details
     */
    async getConfigurationDetails(): Promise<IConfigurationDetailsResponse> {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `${env.tmdbBaseUrl}/configuration`,
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${env.tmdbApiKey}`,
                },
            });

            return data;
        } catch (error) {
            log.error(`Error getting configuration details: ${error}`);
            throw badRequest('Error al obtener configuración')
        }
    }
}