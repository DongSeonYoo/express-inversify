import { Router } from 'express';
import container from '../configs/inversify/inversify.config';
import { ClubController } from '../controllers/club.controller';
import { ClubModule } from '../configs/inversify/types';
import { checkAuth } from '../middlewares/auth.middleware';

const router = Router();
const clubController = container.get<ClubController>(ClubModule.ClubController);

router.post('/', checkAuth, clubController.createClub.bind(clubController));

router.get('/:clubIdx', checkAuth, clubController.getClubProfile.bind(clubController));

router.get('/list/all', checkAuth, clubController.selectAllClub.bind(clubController));

export default router;
