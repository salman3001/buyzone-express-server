import express from 'express';
import { postUser, patchUser } from '../controllers/userController';
import { isAuth } from '../middleware/isAuth';
const router = express.Router();

router.route('/').post(postUser).patch(isAuth, patchUser);

export default router;
