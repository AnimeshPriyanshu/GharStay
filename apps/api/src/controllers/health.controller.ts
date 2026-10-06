import { Request, Response } from 'express';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess } from '../utils/response';
import { config } from '../config';
import { prisma } from '../config/prisma';

export const healthController = {
  check: asyncHandler(async (req: Request, res: Response) => {
    await prisma.$queryRaw`SELECT 1`;
    sendSuccess(res, {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      version: '1.0.0',
    });
  }),
};