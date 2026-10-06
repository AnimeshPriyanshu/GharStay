import { Router } from 'express';
import { reviewController } from '../controllers';
import { authenticate } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createReviewSchema, reviewFiltersSchema } from '../validators';

const router = Router();

router.post('/', authenticate, validate(createReviewSchema), reviewController.createReview);
router.get('/property/:propertyId', validate(reviewFiltersSchema), reviewController.getPropertyReviews);
router.get('/my', authenticate, reviewController.getUserReviews);
router.put('/:id', authenticate, validate(createReviewSchema), reviewController.updateReview);
router.delete('/:id', authenticate, reviewController.deleteReview);

export default router;