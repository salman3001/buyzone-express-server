/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { postUser, patchUser, getUsers, getUser } from '../controllers/userController';
import { isAuth } from '../middleware/isAuth';
import { isAdmin } from '../middleware/isAdmin';
const router = express.Router();

router.route('/').get(isAdmin, getUsers).post(postUser).patch(isAuth, patchUser);
router.route('/:_id').get(isAuth, getUser);
export default router;
