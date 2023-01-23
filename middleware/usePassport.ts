import { Express } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';
export default (app: Express): void => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			function (email, password, done) {
				User.findOne({ email }).exec((err, user) => {
					if (err != null) {
						done(err);
						return;
					}
					if (user == null) {
						done(null, false);
						return;
					}
					if (!user.verifyPassword(password)) {
						done(null, false);
						return;
					}
					done(null, user);
				});
			}
		)
	);
	passport.serializeUser(function (user: any, done) {
		done(null, { id: user._id, isAdmin: user.isAdmin });
	});

	passport.deserializeUser(function (id: string, done) {
		User.findById(new mongoose.Types.ObjectId(id)).exec((err, user) => {
			done(err, user);
		});
	});

	app.use(passport.initialize());
	app.use(passport.session());
};
