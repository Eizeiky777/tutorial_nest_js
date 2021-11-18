import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

      // for activating auto typecasting in dto
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  );

  await app.listen(3000);
}

bootstrap();

// this will throw error any unregistered variable in dto
//   whitelist: true,
//   forbidNonWhitelisted: true,

// this will make variable become instance of defined dto
// but will slightly impact the performance
// could auto parse paramater
//   transform: true,
