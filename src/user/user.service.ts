/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event, EventFormatSample } from 'src/events/entities/event.entity';
import { Connection, getConnection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Book } from './entities/book.entity';
import { User, UserFormatSample } from './entities/user.entity';

@Injectable()
export class UserService {
  // private user: User[] = [
  //   {
  //     id: 1,
  //     name: 'Ekky C',
  //     class: 7,
  //     books: ['the alchemy', 'iron-man'],
  //   },
  //   {
  //     id: 2,
  //     name: 'Ekky C',
  //     class: 7,
  //     books: ['the alchemy', 'iron-man'],
  //   },
  //   {
  //     id: 3,
  //     name: 'Ekky C',
  //     class: 7,
  //     books: ['the alchemy', 'iron-man'],
  //   },
  //   {
  //     id: 4,
  //     name: 'Ekky C',
  //     class: 7,
  //     books: ['the alchemy', 'iron-man'],
  //   },
  //   {
  //     id: 5,
  //     name: 'Ekky C',
  //     class: 7,
  //     books: ['the alchemy', 'iron-man'],
  //   },
  // ];

  constructor(
    @InjectRepository(User, 'default')
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book, 'default')
    private readonly bookRepository: Repository<Book>,
    private readonly connection: Connection,
  ) {}

  async findAll(query: PaginationQueryDto) {
    const { limit, offset } = query;

    return this.userRepository.find({
      relations: ['books'],
      skip: offset,
      take: limit,
      order: { id: 'DESC' },
    });
  }

  async findUserById<T>(id: T) {
    const userOne = await this.userRepository.findOne(id, {
      relations: ['books'],
    });

    if (userOne) {
      return userOne;
    } else {
      throw new NotFoundException(
        `user with id:${id} is not found in database`,
      );
    }
  }

  async create(createUserDto: any) {
    const { books } = createUserDto;

    if (books) {
      // create
      // const bookData = this.bookRepository.create(books[0]);
      // await this.bookRepository.save(bookData);

      // get
      const bookData = await this.bookRepository.findOne(1);

      createUserDto.books = [bookData];

      const userCreate = this.userRepository.create(createUserDto);
      return this.userRepository.save(userCreate);
    } else if (createUserDto) {
      const userCreate = this.userRepository.create(createUserDto);
      return this.userRepository.save(userCreate);
    } else {
      throw new ForbiddenException(`failed create user `);
    }
  }

  async update(id: string, updateUserDto: any) {
    const userUpdate = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
    });

    if (userUpdate) {
      return this.userRepository.save(userUpdate);
    } else {
      throw new ForbiddenException(`failed update user `);
    }
  }

  // YOU ARE ENTERING AREA DELETE

  async remove(id: string) {
    const userDel = await this.findUserById(id);
    if (userDel) {
      this.userRepository.remove(userDel);
    } else {
      throw new ForbiddenException(`failed delete user `);
    }
  }

  async removeManyToMany(id: string) {
    try {
      const curr: any = await this.findUserById(id);
      curr.books = curr.books.filter((data) => data.id !== 1);
      return this.userRepository.save(curr);
    } catch {
      throw new ForbiddenException(`failed remove relation many to many user `);
    }
  }

  // YOU ARE ENTERING AREA TRANSACTION - DB

  async transactionQuery(body: CreateUserDto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const finallyData = {
      status: 200,
      message: 'success transaction',
    };

    try {
      // ============= FORMAT DB ============= //
      let UserDBFormat = UserFormatSample;
      UserDBFormat = null;
      let EventDBFormat = EventFormatSample;
      EventDBFormat = null;
      // ===================================== //

      // throw new Error('test error');

      const user = new User();
      // const user = { ...user, ...body }; --> this kind of action will be throwing error
      user.name = body.name;
      user.class = body.class;
      user.skills = body.skills;
      user.coin = body.coin;
      await queryRunner.manager.save(user);

      const coinEvent = new Event();
      coinEvent.name = 'coin crypto';
      coinEvent.type = 'crypto';
      coinEvent.payload = { userId: user.id };
      await queryRunner.manager.save(coinEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      finallyData.status = 400;
      finallyData.message = err.message;
    } finally {
      await queryRunner.release();

      if (finallyData.status === 400)
        throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

      return finallyData;
    }
  }

  //////
}
