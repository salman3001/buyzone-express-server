import mongoose from 'mongoose';
import { UserSchema } from '../models/User';

export {};

declare global {
	namespace Express {
		export interface User extends Omit<UserSchema, 'verifyPassword'> {
			_id: mongoose.Types.ObjectId;
		}
	}
}
