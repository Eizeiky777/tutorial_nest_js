/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'config/app.config';
import { Connection } from 'typeorm';
import productsConfig from './config/products.config';
import {
  PRODUCT_BRANDS,
  PRODUCT_BRANDS_FACTORY,
  PRODUCT_BRANDS_FACTORY_ASYNC,
} from './products.constants';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';

@Injectable()
export class ProductBrandFactory {
  create() {
    return ['docker', 'heroku', 'ocean'];
  }
}

class mockProductService {}

// class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Module({
  imports: [ProductsModule, ConfigModule.forFeature(productsConfig)],
  providers: [
    ProductsService,
    ProductBrandFactory,

    // =============== new class provider ===============
    { provide: mockProductService, useValue: new mockProductService() },

    // =============== non class based provider tokens ===============
    {
      provide: PRODUCT_BRANDS,
      useValue: ['adidas', 'nike', 'puma'],
    },

    // =============== class provider ===============
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },

    // =============== class factory ===============
    {
      provide: PRODUCT_BRANDS_FACTORY,
      useFactory: () => ['adidasF', 'nikeF', 'pumaF'],
      inject: [ProductBrandFactory],
    },

    // =============== class factory + async ===============
    {
      provide: PRODUCT_BRANDS_FACTORY_ASYNC,
      useFactory: async (connection: Connection): Promise<string[]> => {
        const productBrands = await Promise.resolve([
          'adidasAsync',
          'nikeAsync',
          'pumaAsync',
        ]);
        return productBrands;
      },
      inject: [Connection],
    },
  ],
  controllers: [ProductController],
  exports: [ProductsService],
})
export class ProductsModule {}
