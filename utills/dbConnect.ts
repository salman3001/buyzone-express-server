import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connect } from 'http2';
import onSignalEvent from './OnSignalEvent';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function dbConnect() {
	try {
		const opts = {
			bufferCommands: false,
		};
		mongoose.set('strictQuery', false);
		const conn = await mongoose.connect(MONGODB_URI, opts);
		console.log('connected to mongodb');

		onSignalEvent(() => {
			mongoose.connection.close();
			console.log('mongoose connection closed');
		});
	} catch (error) {
		console.log(error);
	}
}

export default dbConnect;
