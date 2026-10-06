import { Request, Response } from 'express';
import { localPartnerService } from '../services';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { LocalPartnerStatus } from '@gharstay/shared';

export const localPartnerController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const { area } = req.body;
    if (!area) return sendError(res, 'Area is required', 400);
    const partner = await localPartnerService.registerLocalPartner(req.user.userId, area);
    sendSuccess(res, partner, 'Local partner registered successfully', 201);
  }),

  getProfile: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const profile = await localPartnerService.getLocalPartnerProfile(req.user.userId);
    sendSuccess(res, profile);
  }),

  updateStatus: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user || req.user.role !== 'ADMIN') return sendError(res, 'Forbidden', 403);
    const { status } = req.body;
    if (!Object.values(LocalPartnerStatus).includes(status)) {
      return sendError(res, 'Invalid status', 400);
    }
    const partner = await localPartnerService.updateStatus(req.params.id, status);
    sendSuccess(res, partner, 'Status updated successfully');
  }),

  getAll: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user || req.user.role !== 'ADMIN') return sendError(res, 'Forbidden', 403);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await localPartnerService.getAllPartners({
      area: req.query.area as string,
      status: req.query.status as LocalPartnerStatus,
      page,
      limit,
    });
    sendPaginated(res, result, 0, page, limit);
  }),

  getNearby: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user || req.user.role !== 'LOCAL_PARTNER') return sendError(res, 'Forbidden', 403);
    const { area } = req.query;
    if (!area) return sendError(res, 'Area is required', 400);
    const partners = await localPartnerService.getNearbyPartners(area as string);
    sendSuccess(res, partners);
  }),
};