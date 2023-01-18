import { Express } from 'express';
import userRoute from './users';
import productRoute from './products';
import reviewsRoute from './reviews';
import ordersRoute from './orders';
import loginRoute from './login';
import adminOrdersRoute from './adminOrders';
import path from 'path';

export default (app: Express) => {
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, 'index.html'));
	});
	app.use('/api/users', userRoute);
	app.use('/api/products', productRoute);
	app.use('/api/reviews', reviewsRoute);
	app.use('/api/orders', ordersRoute);
	app.use('/api/login', loginRoute);
	app.use('/api/admin/orders', adminOrdersRoute);
	app.get('*', (req, res) => {
		res.sendStatus(404).send({ message: 'server error' });
	});
};
