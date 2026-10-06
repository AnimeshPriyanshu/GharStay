import { Request, Response } from 'express';
import { authService } from '../services';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess, sendError } from '../utils/response';
import { registerSchema, loginSchema } from '../validators';

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const data = registerSchema.shape.body.parse(req.body);
    const result = await authService.register(data);
    sendSuccess(res, result, 'Registration successful', 201);
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const data = loginSchema.shape.body.parse(req.body);
    const result = await authService.login(data.email, data.password);
    sendSuccess(res, result, 'Login successful');
  }),

  getProfile: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      return sendError(res, 'Not authenticated', 401);
    }
    const profile = await authService.getProfile(req.user.userId);
    sendSuccess(res, profile);
  }),
};