// Libs
import { Request, Response } from "express";
// Services
import { MoviesService } from './../services/movies.service';

const moviesService = new MoviesService();

export class MoviesController {
    getAllMovies = async (req: Request, res: Response) => {
        const { page, searchQuery } = req.query
        const user = req.auth;
        const userId = user.userId as string;
        const movies = await moviesService.getAllMovies(Number(page), userId, searchQuery as string);
        res.status(200).json({ success: true, data: movies });
    }

    getMovie = async (req: Request, res: Response) => {
        const { movieId } = req.params;
        const user = req.auth;
        const userId = user.userId as string;
        const movie = await moviesService.getMovie(Number(movieId), userId);
        res.status(200).json({ success: true, data: movie });
    }

    getConfigurationDetails = async (req: Request, res: Response) => {
        const configurationDetails = await moviesService.getConfigurationDetails();
        res.status(200).json({ success: true, data: configurationDetails });
    }
}