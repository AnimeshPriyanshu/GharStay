import { bookingRepository } from '../repositories';
import { propertyRepository } from '../repositories';
import { AppError } from '../utils/app-error';
import { BookingStatus } from '@gharstay/shared';

export const bookingService = {
  async createBooking(guestId: string, data: {
    propertyId: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
  }) {
    const property = await propertyRepository.findById(data.propertyId);
    if (!property) {
      throw new AppError('Property not found', 404);
    }
    if (property.status !== 'ACTIVE' || property.verificationStatus !== 'VERIFIED') {
      throw new AppError('Property is not available for booking', 400);
    }
    if (data.guests > 10) {
      throw new AppError('Maximum 10 guests allowed', 400);
    }

    const conflict = await bookingRepository.findConflicting(
      data.propertyId,
      data.checkIn,
      data.checkOut
    );
    if (conflict) {
      throw new AppError('Property is not available for the selected dates', 409);
    }

    const nights = Math.ceil(
      (data.checkOut.getTime() - data.checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalAmount = nights * property.pricePerNight;

    return bookingRepository.create({
      property: { connect: { id: data.propertyId } },
      guest: { connect: { id: guestId } },
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      totalAmount,
      status: BookingStatus.PENDING,
    });
  },

  async getBookingById(id: string, userId: string, userRole: string) {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    const isGuest = booking.guestId === userId;
    const isHost = booking.property.hostId === userId;
    const isAdmin = userRole === 'ADMIN';

    if (!isGuest && !isHost && !isAdmin) {
      throw new AppError('Not authorized to view this booking', 403);
    }

    return booking;
  },

  async getUserBookings(userId: string, userRole: string, params: {
    status?: BookingStatus;
    page?: number;
    limit?: number;
  }) {
    const skip = ((params.page || 1) - 1) * (params.limit || 10);

    if (userRole === 'HOST') {
      const [bookings, total] = await Promise.all([
        bookingRepository.findMany({ hostId: userId, status: params.status, skip, take: params.limit || 10 }),
        bookingRepository.count({ hostId: userId, status: params.status }),
      ]);
      return { bookings, total, page: params.page || 1, limit: params.limit || 10 };
    }

    const [bookings, total] = await Promise.all([
      bookingRepository.findMany({ guestId: userId, status: params.status, skip, take: params.limit || 10 }),
      bookingRepository.count({ guestId: userId, status: params.status }),
    ]);
    return { bookings, total, page: params.page || 1, limit: params.limit || 10 };
  },

  async updateBookingStatus(id: string, hostId: string, status: BookingStatus) {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
      throw new AppError('Booking not found', 404);
    }
    if (booking.property.hostId !== hostId) {
      throw new AppError('Not authorized to update this booking', 403);
    }

    if (booking.status === BookingStatus.CANCELLED && status !== BookingStatus.CANCELLED) {
      throw new AppError('Cannot update a cancelled booking', 400);
    }

    return bookingRepository.update(id, { status });
  },

  async cancelBooking(id: string, userId: string, userRole: string) {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
      throw new AppError('Booking not found', 404);
    }

    const isGuest = booking.guestId === userId;
    const isHost = booking.property.hostId === userId;
    const isAdmin = userRole === 'ADMIN';

    if (!isGuest && !isHost && !isAdmin) {
      throw new AppError('Not authorized to cancel this booking', 403);
    }

    if (booking.status === BookingStatus.CANCELLED) {
      throw new AppError('Booking already cancelled', 400);
    }

    if (booking.status === BookingStatus.COMPLETED || booking.status === BookingStatus.CHECKED_OUT) {
      throw new AppError('Cannot cancel a completed booking', 400);
    }

    return bookingRepository.update(id, { status: BookingStatus.CANCELLED });
  },
};