import { Router } from 'express';
import { authController } from '../controllers';
import { validate } from '../middleware/validation.middleware';
import { registerSchema, loginSchema } from '../validators';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/profile', authController.getProfile);

export default router;