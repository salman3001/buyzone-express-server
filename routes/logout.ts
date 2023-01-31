import express from 'express';

const router = express.Router();

router.route('/').post((req, res, next) => {
	req.logOut((err) => {
		if (err != null) {
			console.log(err);
			next(err);
			return;
		}
		res.status(200).json({ message: 'logout successfull' });
	});
});

export default router;
