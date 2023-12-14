import container from '../configs/inversify/inversify.config';
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthModule } from '../configs/inversify/types';

const router = Router();
const authController = container.get<AuthController>(AuthModule.AuthController);

router.post('/signup', authController.signUp.bind(authController));

router.post('/login', authController.login.bind(authController));

router.get('/duplicate/email/:email', authController.checkDuplicateEmail.bind(authController));

export default router;
