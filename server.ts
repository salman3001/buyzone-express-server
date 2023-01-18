import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import dbConnect from './utills/dbConnect';
import onSignalEvent from './utills/OnSignalEvent';
import useRoutes from './routes/allRoutes';
import useMiddlewares from './middleware/allMiddlewares';

dotenv.config();

// Variables
const port = process.env.PORT;
const app = express();

//midlewares
useMiddlewares(app);

// routes
useRoutes(app);

//Error handler middleware
app.use((err: any, req: any, res: any, next: any) => {
	res.status(500).send(err?.message || 'server error');
});

// connection to DB and starting server
async function connection() {
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

connection();
