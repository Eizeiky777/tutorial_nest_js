/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { ProductRatingService } from './product-rating.service';

// @UsePipes(ValidationPipe) // will validate entire controller
@Controller('product-rating')
export class ProductRatingController {
  constructor(private readonly productRatingService: ProductRatingService) {
    console.log('instantiated in controller product rating');
  }

  @Public()
  @Get()
  find(@Query() query: any, @Protocol() protocol: string) {
    console.log(
      '🚀 ~ file: product-rating.controller.ts ~ line 27 ~ ProductRatingController ~ find ~ protocol',
      protocol,
    );
    return this.productRatingService.find(query);
  }

  // Validation Pipe will validate only in this controller
  @Post()
  create(@Body(ValidationPipe) body: any) {
    return this.productRatingService.create(body);
  }

  @Public()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.productRatingService.findById(id);
  }
}
