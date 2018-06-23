import * as redis from 'redis';
import * as mongoose from 'mongoose';
import { MONGODB_CONNECTION, REDIS_CONNECTION } from '../constants'
export const databaseProviders = [
  {
    provide: MONGODB_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://localhost:27017/nest'),
  },
  {
    provide: REDIS_CONNECTION,
    useFactory: () => {
      const client = redis.createClient();
      client.on('connect', () => {
        console.log('connected redis successfully');
      });
      return client;
    }
  },
]

