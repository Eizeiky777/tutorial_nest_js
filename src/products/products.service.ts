/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Inject, Injectable, Scope } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import productsConfig from './config/products.config';
import {
  PRODUCT_BRANDS,
  PRODUCT_BRANDS_FACTORY,
  PRODUCT_BRANDS_FACTORY_ASYNC,
} from './products.constants';

// @Injectable({ scope: Scope.TRANSIENT }) // instantiated non-singleton
// @Injectable({ scope: Scope.REQUEST }) // only instantiated by request but will impact performance
// @Injectable({ scope: Scope.DEFAULT })
@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_BRANDS) productBrands: string[],
    @Inject(PRODUCT_BRANDS_FACTORY) productBrandFactory: string[],
    @Inject(PRODUCT_BRANDS_FACTORY_ASYNC) productBrandFactoryAsync: string[],
    // @Inject(REQUEST) private readonly req: Request, // if uncomment auto changes into REQUEST SCOPE
    @Inject(productsConfig.KEY)
    private readonly configService: ConfigType<typeof productsConfig>,
  ) {
    // console.log(
    //   '🚀 ~ file: products.service.ts ~ line 22 ~ ProductsService ~ request',
    //   req.ip,
    // );
    console.log(
      '🚀 ~ file: products.service.ts ~ line 17 constructor ~ productBrandFactoryAsync',
      productBrandFactoryAsync,
    );
    console.log(
      '🚀 ~ file: products.service.ts ~ line 12 constructor ~  productBrandFactory',
      productBrandFactory,
    );
    console.log(
      '🚀 ~ file: products.service.ts ~ line 8  constructor ~ productBrands',
      productBrands,
    );

    // configuration
    const databaseHost = this.configService.foo;
    console.log(
      '🚀 ~ file: products.service.ts ~ line 43 ~ ProductsService ~ databaseHost',
      databaseHost,
    );
  }
}
