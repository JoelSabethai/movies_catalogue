// Libs
import type { Express } from "express";
import express from "express";
// Routers
import { authRouter } from "./auth.router";
import { moviesRouter } from './movies.router';
import { favoritesRouter } from "./favorites.router";

export const routerApi = (app: Express) => {
    const router = express.Router();

    // Parent router
    app.use('/app', router);

    // Child routes
    router.use('/auth', authRouter);
    router.use('/movies', moviesRouter);
    router.use('/favorites', favoritesRouter);
}