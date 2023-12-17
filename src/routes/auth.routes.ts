import container from '../configs/inversify/inversify.config';
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthModule } from '../configs/inversify/types';
import { checkAuth } from '../middlewares/auth.middleware';

const router = Router();
const authController = container.get<AuthController>(AuthModule.AuthController);

router.post('/signup', authController.signUp.bind(authController));

router.post('/login', authController.login.bind(authController));

router.delete('/logout', authController.logout.bind(authController));

router.get('/duplicate/email/:email', checkAuth, authController.checkDuplicateEmail.bind(authController));

export default router;
