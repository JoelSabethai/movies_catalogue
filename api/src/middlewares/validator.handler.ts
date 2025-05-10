// Libs
import Joi from 'joi/lib';
import { badRequest } from '@hapi/boom';
import type { Request, Response, NextFunction } from 'express';
// Middlewares
import { log } from './logger';

export const validatorHandler = (schema: Joi.ObjectSchema<unknown>, property: 'params' | 'body' | 'query' | 'path') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];

    log.debug('Validating schema: ', property);

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      log.info(error);

      return next(badRequest(error));
    }

    next();
  };
};
