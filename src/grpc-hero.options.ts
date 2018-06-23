import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    // DO NOT set prefix `http`
    url: 'localhost:5100',
    package: 'hero',
    protoPath: join(__dirname, './hero/hero.proto'),
  },
};
