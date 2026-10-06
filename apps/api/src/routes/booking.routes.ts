import { Router } from 'express';
import { bookingController } from '../controllers';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createBookingSchema, updateBookingSchema, bookingFiltersSchema } from '../validators';

const router = Router();

router.post('/', authenticate, validate(createBookingSchema), bookingController.createBooking);
router.get('/', authenticate, validate(bookingFiltersSchema), bookingController.getUserBookings);
router.get('/:id', authenticate, bookingController.getBookingById);
router.put('/:id', authenticate, validate(updateBookingSchema), bookingController.updateBooking);
router.delete('/:id', authenticate, bookingController.cancelBooking);

export default router;