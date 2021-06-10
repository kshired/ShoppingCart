import { Router } from 'express';
import authJwt from '../../utils/auth';
import signUp from './signUp';
import login from './login';
import { seeProfile, modifyProfile } from './profile';
import refresh from './refresh';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/profile', authJwt, seeProfile);
router.patch('/profile', authJwt, modifyProfile);
router.post('/refresh', refresh);

export default router;
