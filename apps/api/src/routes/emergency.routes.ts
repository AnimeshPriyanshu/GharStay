import { Router } from 'express';
import { emergencyController } from '../controllers';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createEmergencyRequestSchema, updateEmergencyRequestSchema, emergencyFiltersSchema } from '../validators';

const router = Router();

router.post('/', validate(createEmergencyRequestSchema), emergencyController.createEmergencyRequest);
router.get('/', authenticate, authorize('ADMIN', 'LOCAL_PARTNER'), validate(emergencyFiltersSchema), emergencyController.getEmergencyRequests);
router.get('/nearby', authenticate, authorize('LOCAL_PARTNER', 'ADMIN'), emergencyController.getNearbyEmergencies);
router.get('/:id', authenticate, emergencyController.getEmergencyRequest);
router.put('/:id', authenticate, validate(updateEmergencyRequestSchema), emergencyController.updateEmergencyRequest);

export default router;