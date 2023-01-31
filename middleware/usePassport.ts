import { Express } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';
export default (app: Express): void => {
	app.use(passport.initialize());
	app.use(passport.session());
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			function (email, password, done) {
				User.findOne({ email }).exec((err, user) => {
					if (err != null) {
						done(null, false);
					}
					if (user == null) {
						done(null, false);
						return;
					}
					const isAuthenticated = user.verifyPassword(password);
					if (!isAuthenticated) {
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
};
