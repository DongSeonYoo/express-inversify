import container from '../inversify/inversify.config';
import TYPES from '../inversify/types';
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

router.post('/signup', authController.signUp.bind(authController));

router.post('/login', authController.login.bind(authController));

export default router;
