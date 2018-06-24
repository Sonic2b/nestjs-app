import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly phone: string;
  readonly email: string;
  readonly password: string;
}
