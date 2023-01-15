import express from 'express';
import { postUser, patchUser } from '../controllers/userController';
import { isLoggedin } from '../middleware/isLoggedin';
const router = express.Router();

router.route('/').post(postUser).patch(isLoggedin, patchUser);

export default router;
