import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptor/wrap-response.interceptor';

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

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
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
