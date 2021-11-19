/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Module, Scope } from '@nestjs/common';
import { PRODUCT_BRANDS } from 'src/products/products.constants';
import { ProductsModule } from 'src/products/products.module';
import { ProductRatingService } from './product-rating.service';

@Module({
  imports: [ProductRatingModule, ProductsModule],
  providers: [ProductRatingService],
})
export class ProductRatingModule {}
