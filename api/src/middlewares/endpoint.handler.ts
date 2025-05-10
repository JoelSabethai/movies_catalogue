import { notFound } from '@hapi/boom';
import type { Request, Response, NextFunction } from 'express';

/**
 * The function `endpointNotFoundHandler` throws a 'notFound' error with the message 'Endpoint not
 * found'.
 * @param {Request} req - The `req` parameter typically represents the request object in an Express
 * route handler. It contains information about the incoming HTTP request such as headers, parameters,
 * body, etc.
 * @param {Response} res - The `res` parameter in the function `endpointNotFoundHandler` represents
 * the response object in Express.js. It is used to send a response back to the client making the
 * request.
 * @param {NextFunction} next - The `next` parameter in the function `endpointNotFoundHandler` is a
 * reference to the next middleware function in the application's request-response cycle. It is a
 * callback function that is called to pass control to the next middleware function in the stack.
 */
export function endpointNotFoundHandler(req: Request, res: Response, next: NextFunction) {
  throw notFound('Endpoint not found');
}
