import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '..', 'env', `${process.env.NODE_ENV}.env`) });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    },
  ));
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Server is listening on ${process.env.NODE_ENV} environment with port ${port}`, 'Main');
}

bootstrap();
