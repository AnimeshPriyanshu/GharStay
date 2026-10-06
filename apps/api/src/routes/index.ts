import { Router } from 'express';
import authRoutes from './auth.routes';
import propertyRoutes from './property.routes';
import bookingRoutes from './booking.routes';
import reviewRoutes from './review.routes';
import emergencyRoutes from './emergency.routes';
import localPartnerRoutes from './local-partner.routes';
import healthRoutes from './health.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/properties', propertyRoutes);
router.use('/bookings', bookingRoutes);
router.use('/reviews', reviewRoutes);
router.use('/emergency-requests', emergencyRoutes);
router.use('/local-partners', localPartnerRoutes);
router.use('/', healthRoutes);

export default router;