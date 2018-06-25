import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { OtcexLoggerService } from './common/services/otcex-logger.service';
import { DiscoveryModule } from './discovery/discovery.module'
import * as config from 'config'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new OtcexLoggerService(),
  });

  const options = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The users API description')
    .setVersion('1.0.0')
    .addTag('users')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1', app, document);

  DiscoveryModule.registerServices(config.get('discovery'))
  const port = config.get('port')
  const env = process.env.NODE_ENV || 'local'
  await app.listen(String(port), () => {
    app.logger.log(`Current environment ${env} `)
    app.logger.log(`Server is listening at ${port}`)
  });
}
bootstrap();
