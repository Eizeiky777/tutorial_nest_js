/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServices: UserService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.userServices.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userServices.findUserById(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userServices.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userServices.update(id, body);
  }

  // AREA DELETE

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userServices.remove(id);
  }

  @Delete('many-to-many/:id')
  removeManyToManyRelationShip(@Param('id') id: string) {
    return this.userServices.removeManyToMany(id);
  }

  // AREA TRANSACTION-DB
  @Post('v1/transaction-db')
  @HttpCode(200)
  createTransactionDB(@Body() body: CreateUserDto) {
    return this.userServices.transactionQuery(body);
  }
}
