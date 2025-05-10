// Libs
import { Request, Response } from "express";
// Services
import { FavoritesService } from './../services/favorites.service';

const favoritesService = new FavoritesService();

export class FavoritesController {
    getFavorites = async (req: Request, res: Response) => {
        const { page, searchQuery } = req.query
        const user = req.auth;
        const userId = user.userId as string;
        const favoritesMovies = await favoritesService.getFavorites(Number(page), userId, searchQuery as string);
        res.status(200).json({ success: true, data: favoritesMovies });
    }

    addMovieToFavorites = async (req: Request, res: Response) => {
        const { movieId } = req.params;
        const user = req.auth;
        const userId = user.userId as string;
        await favoritesService.addToFavorites(Number(movieId), userId);
        res.status(200).json({ success: true });
    }

    removeMovieOfFavorites = async (req: Request, res: Response) => {
        const { movieId } = req.params;
        const user = req.auth;
        const userId = user.userId as string;
        await favoritesService.removeOfFavorites(Number(movieId), userId);
        res.status(200).json({ success: true });
    }
}