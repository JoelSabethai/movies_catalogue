// Libs
import { unauthorized } from '@hapi/boom';
import type { Request, Response, NextFunction } from 'express';
// Middleware
import { log } from './logger';
import { clerkClient } from '@clerk/express'

/**
 * The function `unAuthorized` throws a 'unauthorized' error with the message 'Session expired'.
 * @param {Request} req - The `req` parameter typically represents the request object in an Express
 * route handler. It contains information about the incoming HTTP request such as headers, parameters,
 * body, etc.
 * @param {Response} res - The `res` parameter in the function `unAuthorized` represents
 * the response object in Express.js. It is used to send a response back to the client making the
 * request.
 * @param {NextFunction} next - The `next` parameter in the function `unAuthorized` is a
 * reference to the next middleware function in the application's request-response cycle. It is a
 * callback function that is called to pass control to the next middleware function in the stack.
 */
export async function unAuthorized(req: Request, res: Response, next: NextFunction) {
    if(!req.auth || !req.auth.userId) {
        log.error('User session expired');

        if(!req.auth) throw unauthorized("Token faltante o invalido");
        if(!req.auth.userId) throw unauthorized("Sesión expirada");
    } else if(req.auth && req.auth.userId) {
        const sessions = await clerkClient.sessions.getSessionList({ userId: req.auth.userId, status: 'active' });

        if(sessions.totalCount === 0) throw unauthorized("Sesión expirada");
    }

    next();
}