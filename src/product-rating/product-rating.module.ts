/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Module, Scope, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { PRODUCT_BRANDS } from 'src/products/products.constants';
import { ProductsModule } from 'src/products/products.module';
import { ProductRatingController } from './product-rating.controller';
import { ProductRatingService } from './product-rating.service';

@Module({
  imports: [ProductRatingModule, ProductsModule],
  controllers: [ProductRatingController],
  providers: [
    ProductRatingService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class ProductRatingModule {}
