import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import ormconfig = require('../ormconfig');

@Module({
  imports: [
    UserModule,
    // example multi connection
    TypeOrmModule.forRoot(ormconfig[0]),
    TypeOrmModule.forRoot(ormconfig[1]),

    // example single connection
    // TypeOrmModule.forRoot({
    // name: 'default',
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'root',
    //   database: 'postgres',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
