/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { login } from '../controllers/loginController';
import passport from 'passport';

const router = express.Router();

router.route('/').post(passport.authenticate('local'), login);

export default router;
