import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path'

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'http://192.168.0.153:5001',
    package: 'hero',
    protoPath: join(__dirname, './hero/hero.proto')
  }
}
