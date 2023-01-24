/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { postUser, patchUser, getUser } from '../controllers/userController';
import { isAuth } from '../middleware/isAuth';
import { isAdmin } from '../middleware/isAdmin';
const router = express.Router();

router.route('/').get(isAdmin, getUser).post(postUser).patch(isAuth, patchUser);

export default router;
