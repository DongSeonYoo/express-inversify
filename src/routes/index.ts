import { Router } from 'express';
import authRouter from './auth.routes';

const router = Router();

router.use('/auth', authRouter);
// router.use('/upload', uploadApi);
// router.use('/club', clubApi);
// router.use('/notification', notificationApi);
// router.use('/board', boardApi);
// router.use('/search', searchApi);
// router.use('/general', generalApi);
// router.use('/notice', noticeApi);
// router.use('/promotion', promotionApi);

export default router;
