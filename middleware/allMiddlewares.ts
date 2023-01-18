import express, { Errback, Express, NextFunction, Request, Response } from 'express';

export default (app: Express) => {
	// request parsers
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());

	//static files midleware
	app.use('/images', express.static('./images'));

	//error handler middleware
};
