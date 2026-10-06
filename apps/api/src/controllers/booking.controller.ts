import { Request, Response } from 'express';
import { bookingService } from '../services';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess, sendError, sendPaginated } from '../utils/response';
import { createBookingSchema, updateBookingSchema, bookingFiltersSchema } from '../validators';

export const bookingController = {
  createBooking: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const data = createBookingSchema.shape.body.parse(req.body);
    const booking = await bookingService.createBooking(req.user.userId, {
      ...data,
      checkIn: new Date(data.checkIn),
      checkOut: new Date(data.checkOut),
    });
    sendSuccess(res, booking, 'Booking created successfully', 201);
  }),

  getBookingById: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const booking = await bookingService.getBookingById(req.params.id, req.user.userId, req.user.role);
    sendSuccess(res, booking);
  }),

  getUserBookings: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const filters = bookingFiltersSchema.shape.query.parse(req.query);
    const result = await bookingService.getUserBookings(req.user.userId, req.user.role, {
      status: filters.status,
      page: filters.page,
      limit: filters.limit,
    });
    sendPaginated(res, result.bookings, result.total, result.page, result.limit);
  }),

  updateBooking: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const { id } = updateBookingSchema.shape.params.parse(req.params);
    const data = updateBookingSchema.shape.body.parse(req.body);
    if (data.status) {
      const booking = await bookingService.updateBookingStatus(id, req.user.userId, data.status);
      sendSuccess(res, booking, 'Booking updated successfully');
    } else {
      sendError(res, 'No valid update fields provided', 400);
    }
  }),

  cancelBooking: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) return sendError(res, 'Not authenticated', 401);
    const booking = await bookingService.cancelBooking(req.params.id, req.user.userId, req.user.role);
    sendSuccess(res, booking, 'Booking cancelled successfully');
  }),
};