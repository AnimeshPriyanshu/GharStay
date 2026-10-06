import { Router } from 'express';
import { propertyController } from '../controllers';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createPropertySchema, updatePropertySchema, propertyFiltersSchema } from '../validators';

const router = Router();

router.get('/', validate(propertyFiltersSchema), propertyController.getProperties);
router.get('/host', authenticate, authorize('HOST', 'ADMIN'), propertyController.getHostProperties);
router.get('/:id', propertyController.getPropertyById);
router.post('/', authenticate, authorize('HOST', 'ADMIN'), validate(createPropertySchema), propertyController.createProperty);
router.put('/:id', authenticate, authorize('HOST', 'ADMIN'), validate(updatePropertySchema), propertyController.updateProperty);
router.delete('/:id', authenticate, authorize('HOST', 'ADMIN'), propertyController.deleteProperty);

export default router;