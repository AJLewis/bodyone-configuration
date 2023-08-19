import { model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
}

const User = model<IUser>('User');

export default User; 