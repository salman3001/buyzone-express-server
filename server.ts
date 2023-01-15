import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import dbConnect from './utills/dbConnect';
import onSignalEvent from './utills/OnSignalEvent';
import userRoute from './routes/users';
import productRoute from './routes/products';
import reviewsRoute from './routes/reviews';
import ordersRoute from './routes/orders';
import loginRoute from './routes/login';
import adminOrdersRoute from './routes/adminOrders';

import path from 'path';

dotenv.config();

// Variables
const port = process.env.PORT;
const app = express();

//midlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/images', express.static('./images'));

// routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/reviews', reviewsRoute);
app.use('/orders', ordersRoute);
app.use('/login', loginRoute);
app.use('/admin/orders', adminOrdersRoute);

// 404 not found routes
app.get('*', (req, res) => {
	res.sendStatus(404).send({ message: 'server error' });
});

//Error handler middleware
app.use((err, req, res, next) => {
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
