import express, { Express } from 'express';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import usePassport from './usePassport';
import path from 'path';

export default (app: Express): void => {
	// request parsers
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(
		session({
			secret: process.env.SESSION_SECRETE as string,
			resave: false,
			saveUninitialized: true,
			store: mongoStore.create({ mongoUrl: process.env.MONGODB_URI, autoRemoveInterval: 10 }),
			cookie: {
				maxAge: 1000 * 60 * 60,
			},
		})
	);
	// useing passport middleware
	usePassport(app);

	// static files midleware
	app.use('/api/images', express.static(path.join(__dirname, '..', '/images')));

	// error handler middleware
};
