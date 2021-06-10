import { Router } from 'express';
import usersRouter from './users';
import { uploadImage, uploadToS3 } from '../utils/upload';
const router = Router();

router.use('/users', usersRouter);
router.use('/upload', uploadToS3.single('image'), uploadImage);
export = router;
