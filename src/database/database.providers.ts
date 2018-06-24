import * as redis from 'redis';
import * as mongoose from 'mongoose';
import { MONGODB_CONNECTION, REDIS_CONNECTION } from '../constants';
import * as config from 'config';
import { Logger } from '@nestjs/common';

const logger: Logger = new Logger('DatabaseModule');
export const databaseProviders = [
  {
    provide: MONGODB_CONNECTION,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        config.get('mongodb.url'),
        err => {
          if (!err) {
            logger.warn('MongoDB connected');
          }
        },
      ),
  },
  {
    provide: REDIS_CONNECTION,
    useFactory: () => {
      const client = redis.createClient(config.get('redis.url'));
      client.on('connect', () => {
        logger.error('Redis connected');
      });
      return client;
    },
  },
];
