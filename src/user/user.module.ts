import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Product } from 'src/products/entities/product.entity';
import { Book } from './entities/book.entity';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    // one by one example
    TypeOrmModule.forFeature([User], 'default'),
    TypeOrmModule.forFeature([Book], 'default'),
    TypeOrmModule.forFeature([Event], 'default'),
    TypeOrmModule.forFeature([Product], 'default-postgres-2'),

    // entire entity if connection's name is same example
    // TypeOrmModule.forFeature([User, Book, Event], 'default')
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
