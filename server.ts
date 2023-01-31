import dotenv from 'dotenv';
import dbConnect from './utills/dbConnect';
import onSignalEvent from './utills/OnSignalEvent';
import useRoutes from './routes/allRoutes';
import useMiddlewares from './middleware/allMiddlewares';
import express from 'express';

dotenv.config();

// Variables
const port = process.env.PORT;
const app = express();

// midlewares
useMiddlewares(app);

// routes
useRoutes(app);

// Error handler middleware
app.use((err: any, req: any, res: any, next: any) => {
	res.status(500).json({ message: err || 'server error' });
});

// connection to DB and starting server
async function connection(): Promise<void> {
	try {
		await dbConnect();

		const server = app.listen(port, () => {
			console.log(`server is listning on ${port}`);
			onSignalEvent(() => {
				server?.close();
				console.log('server shutdown \n');
			});
		});
	} catch (error) {
		console.log(error);
	}
}

connection().catch((err) => {
	console.log(err);
});
