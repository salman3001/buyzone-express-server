import express from 'express';
import { postUser, patchUser } from '../controllers/userController';
const router = express.Router();

router.route('/').post(postUser).patch(patchUser);

export default router;
