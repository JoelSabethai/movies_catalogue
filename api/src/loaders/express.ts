// Libs
import { type Express, json, urlencoded } from 'express';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
// Routes
import { routerApi } from './../routes';
// Loaders
import { connectDB } from '../loaders/mongoose';
// Middlewares
import { morganStream, log } from '../middlewares/logger';
import { endpointNotFoundHandler } from '../middlewares/endpoint.handler';
import { boomErrorHandler, errorHandler, mongooseErrorHandler, joiErrorHandler } from '../middlewares/error.handler';
import { clerkMiddleware } from '@clerk/express'
// Config
import { env } from '../config';

export const createApp = (): Express => {
    const app: Express = express();

    // Logger
    app.use(morgan(':method :url :status :res[content-length] [:date[clf]] - :response-time ms'));
    app.use(morgan('combined', { stream: morganStream }));

    // Body parser
    app.use(json());
    app.use(urlencoded({ extended: true }));

    // Vendor Middleware
    const corsOptions = {
        origin: env.corsAllowOrigins,
        methods: ['OPTIONS', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'Expires', 'If-Modified-Since'],
        credentials: true,
    };

    app.use(cors(corsOptions));

    app.use(clerkMiddleware({ secretKey: env.clerkSecretKey, publishableKey: env.clerkPublishableKey }))

    // Routes
    routerApi(app);

    // Error Handlers
    app.use(endpointNotFoundHandler);
    app.use(boomErrorHandler);
    app.use(joiErrorHandler);
    app.use(errorHandler);
    app.use(mongooseErrorHandler);

    process.on('SIGINT', async () => {
        try {
            await mongoose.connection.close();
            log.debug('MongoDB connection closed through app termination');
            process.exit(0);
        } catch (err) {
            log.error('Error closing MongoDB connection:', err);
            process.exit(1);
        }
    });

    connectDB();

    return app;
}