/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { PRODUCT_BRANDS } from 'src/products/products.constants';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ProductRatingService {
  constructor(
    private readonly productService: ProductsService,
    // @Inject(PRODUCT_BRANDS) productBrands: string[],
  ) {
    console.log(
      '🚀 ~ file: product-rating.service.ts ~ line 12 ~ ProductRatingService ~ productBrands',
      productService,
    );
  }

  async find(query: any) {
    // dummy asynchronous
    // await new Promise(resolve => setTimeout(resolve, 5000))
    return 'product rating data'
  }

  async create(body: any) {
    return 'create product rating data'
  }

  async findById(id: number){
    return `find by Id ${id} `
  }


}
