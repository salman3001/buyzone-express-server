import jwt from 'jsonwebtoken';
import express from 'express';

const router = express.Router();

router.route('/').get((req, res, next) => {
	console.log(req.session);
	req.session.passport = null;
	console.log(req.session);
	req.session.save();
	res.send('c');
});

export default router;