import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema'; 
 import { MONGODB_CONNECTION } from '../constants'
export const usersProviders = [
  {
    provide: 'UserModelToken',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [MONGODB_CONNECTION],
  },
];
