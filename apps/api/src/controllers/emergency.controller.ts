import { Request, Response } from 'express';
import { emergencyService } from '../services';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { createEmergencyRequestSchema, updateEmergencyRequestSchema, emergencyFiltersSchema } from '../validators';

export const emergencyController = {
  createEmergencyRequest: asyncHandler(async (req: Request, res: Response) => {
    const data = createEmergencyRequestSchema.shape.body.parse(req.body);
    const request = await emergencyService.createEmergencyRequest({
      ...data,
      guestId: req.user?.userId,
    });
    sendSuccess(res, request, 'Emergency request created successfully', 201);
  }),

  getEmergencyRequest: asyncHandler(async (req: Request, res: Response) => {
    const request = await emergencyService.getEmergencyRequest(
      req.params.id,
      req.user?.userId,
      req.user?.role
    );
    sendSuccess(res, request);
  }),

  getEmergencyRequests: asyncHandler(async (req: Request, res: Response) => {
    const filters = emergencyFiltersSchema.shape.query.parse(req.query);
    const result = await emergencyService.getEmergencyRequests({
      ...filters,
      page: filters.page,
      limit: filters.limit,
    });
    sendPaginated(res, result.requests, result.total, result.page, result.limit);
  }),

  updateEmergencyRequest: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const { id } = updateEmergencyRequestSchema.shape.params.parse(req.params);
    const data = updateEmergencyRequestSchema.shape.body.parse(req.body);
    const request = await emergencyService.updateEmergencyRequest(
      id,
      req.user.userId,
      req.user.role,
      data
    );
    sendSuccess(res, request, 'Emergency request updated successfully');
  }),

  getNearbyEmergencies: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const { city, locality } = req.query;
    if (!city || !locality) {
      return sendError(res, 'City and locality are required', 400);
    }
    const requests = await emergencyService.getNearbyEmergencies(city as string, locality as string);
    sendSuccess(res, requests);
  }),
};