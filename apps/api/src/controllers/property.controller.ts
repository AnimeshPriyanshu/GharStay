import { Request, Response } from 'express';
import { propertyService } from '../services';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { createPropertySchema, updatePropertySchema, propertyFiltersSchema } from '../validators';

export const propertyController = {
  getProperties: asyncHandler(async (req: Request, res: Response) => {
    const filters = propertyFiltersSchema.shape.query.parse(req.query);
    const result = await propertyService.getProperties({
      ...filters,
      checkIn: filters.checkIn,
      checkOut: filters.checkOut,
      page: filters.page,
      limit: filters.limit,
    });
    sendPaginated(res, result.data, result.total, result.page, result.limit);
  }),

  getPropertyById: asyncHandler(async (req: Request, res: Response) => {
    const property = await propertyService.getPropertyById(req.params.id);
    sendSuccess(res, property);
  }),

  createProperty: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const data = createPropertySchema.shape.body.parse(req.body);
    const property = await propertyService.createProperty(req.user.userId, data);
    sendSuccess(res, property, 'Property created successfully', 201);
  }),

  updateProperty: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const { id } = updatePropertySchema.shape.params.parse(req.params);
    const data = updatePropertySchema.shape.body.parse(req.body);
    const property = await propertyService.updateProperty(id, req.user.userId, data);
    sendSuccess(res, property, 'Property updated successfully');
  }),

  deleteProperty: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    await propertyService.deleteProperty(req.params.id, req.user.userId);
    sendSuccess(res, null, 'Property deleted successfully');
  }),

  getHostProperties: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await propertyService.getHostProperties(req.user.userId, page, limit);
    sendPaginated(res, result.properties, result.total, result.page, result.limit);
  }),
};