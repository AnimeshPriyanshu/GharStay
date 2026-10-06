import { Response } from 'express';
import { ApiResponse, PaginatedResponse } from '@gharstay/shared';

export const sendSuccess = <T>(res: Response, data: T, message?: string, statusCode = 200) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  return res.status(statusCode).json(response);
};

export const sendPaginated = <T>(
  res: Response,
  data: T[],
  total: number,
  page: number,
  limit: number,
  message?: string
) => {
  const response: PaginatedResponse<T> = {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
  return res.status(200).json({
    success: true,
    ...response,
    message,
  });
};

export const sendError = (res: Response, message: string, statusCode = 500) => {
  const response: ApiResponse = {
    success: false,
    error: message,
  };
  return res.status(statusCode).json(response);
};