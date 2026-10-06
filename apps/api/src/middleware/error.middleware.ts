import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError, ValidationError } from '../utils/app-error';
import { sendError } from '../utils/response';
import { config, isDevelopment } from '../config';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return sendError(res, 'Validation failed', 400);
  }

  if (err instanceof AppError) {
    return sendError(res, err.message, err.statusCode);
  }

  if (err instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    for (const issue of err.issues) {
      const path = issue.path.join('.');
      if (!errors[path]) errors[path] = [];
      errors[path].push(issue.message);
    }
    return res.status(400).json({ success: false, error: 'Validation failed', details: errors });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return sendError(res, 'A record with this value already exists', 409);
    }
    if (err.code === 'P2025') {
      return sendError(res, 'Record not found', 404);
    }
  }

  console.error('Error:', err);

  if (isDevelopment) {
    return sendError(res, err.message || 'Internal server error', 500);
  }

  return sendError(res, 'Internal server error', 500);
};

export const notFoundHandler = (req: Request, res: Response) => {
  sendError(res, `Route ${req.method} ${req.path} not found`, 404);
};