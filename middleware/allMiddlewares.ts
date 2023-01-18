import express, { Errback, Express, NextFunction, Request, Response } from 'express';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import usePassport from './usePassport';

export default (app: Express) => {
	// request parsers
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(
		session({
			secret: process.env.SESSION_SECRTE as string,
			resave: false,
			saveUninitialized: true,
			store: mongoStore.create({ mongoUrl: process.env.MONGODB_URI, autoRemoveInterval: 10 }),
			cookie: {
				maxAge: 1000 * 60 * 60,
			},
		})
	);
	//useing passport middleware
	usePassport(app);

	//static files midleware
	app.use('/images', express.static('./images'));

	//error handler middleware
};
