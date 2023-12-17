import container from '../configs/inversify/inversify.config';
import { Router } from 'express';
import { UserModule } from '../configs/inversify/types';
import { UserController } from '../controllers/user.controller';
import { checkAuth } from '../middlewares/auth.middleware';

const router = Router();
const userController = container.get<UserController>(UserModule.UserController);

router.get('/', checkAuth, userController.getProfile.bind(userController));

router.put('/', checkAuth, userController.modifyProfile.bind(userController));

router.delete('/', checkAuth, userController.deleteUser.bind(userController));

export default router;
