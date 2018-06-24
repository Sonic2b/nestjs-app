import * as redis from 'redis';
import * as mongoose from 'mongoose';
import { MONGODB_CONNECTION, REDIS_CONNECTION } from '../constants';
import * as config from 'config';
export const databaseProviders = [
  {
    provide: MONGODB_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(config.get('mongodb.url')),
  },
  {
    provide: REDIS_CONNECTION,
    useFactory: () => {
      const client = redis.createClient(config.get('redis.url'));
      client.on('connect', () => {
        console.log('connected redis successfully');
      });
      return client;
    },
  },
];
