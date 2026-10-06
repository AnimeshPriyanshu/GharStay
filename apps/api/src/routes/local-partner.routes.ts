import { Router } from 'express';
import { localPartnerController } from '../controllers';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', authenticate, authorize('LOCAL_PARTNER'), localPartnerController.register);
router.get('/profile', authenticate, authorize('LOCAL_PARTNER'), localPartnerController.getProfile);
router.get('/', authenticate, authorize('ADMIN'), localPartnerController.getAll);
router.get('/nearby', authenticate, authorize('LOCAL_PARTNER'), localPartnerController.getNearby);
router.put('/:id/status', authenticate, authorize('ADMIN'), localPartnerController.updateStatus);

export default router;