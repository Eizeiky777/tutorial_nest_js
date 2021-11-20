/* eslint-disable @typescript-eslint/no-unused-vars */

import { config } from 'dotenv';
config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { ProductRatingModule } from './product-rating/product-rating.module';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import ormconfig = require('../ormconfig');
import { ProductRatingService } from './product-rating/product-rating.service';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import Joi = require('@hapi/joi');
import appConfig from 'config/app.config';

// env
const {
  DATABASE_MYSQL_USERNAME,
  DATABASE_MYSQL_PASSWORD,
  DATABASE_MYSQL_NAME,
  DATABASE_MYSQL_PORT,
  DATABASE_MYSQL_HOST,
} = process.env;

@Module({
  imports: [
    // nest config + joi
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   // validationSchema: Joi.object({
    //   //   DATABASE_MYSQL_HOST: Joi.required(),
    //   //   DATABASE_MYSQL_PORT: Joi.number().default(3306),
    //   // }),
    // }),

    // multi connection
    TypeOrmModule.forRootAsync({
      useFactory: () => ormconfig[0], // async must at the top of everything
    }),
    TypeOrmModule.forRoot(ormconfig[1]),

    // single dynamic connection
    DatabaseModule.register({
      name: DATABASE_MYSQL_NAME,
      type: 'mysql',
      host: DATABASE_MYSQL_HOST,
      port: +DATABASE_MYSQL_PORT,
      username: DATABASE_MYSQL_USERNAME,
      password: DATABASE_MYSQL_PASSWORD,
      database: 'platform',
      entities: ['dist/**/v2/mysql/*.entity.js'],
      migrations: ['dist/migrations/v2/mysql/*.js'],
      cli: {
        migrationsDir: 'src/migrations/sql',
      },
      // synchronize: true,
    }),

    // single mongo connection
    // MongooseModule.forRootAsync({
    //   useFactory: () => ({
    //     uri: 'mongodb+srv://owner:root@bulldogdev.fib6u.mongodb.net/development?retryWrites=true&w=majority',
    //   }),
    // }),

    UserModule,
    ProductRatingModule,
    ProductsModule,
    DatabaseModule,
    CommonModule,

    //
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
