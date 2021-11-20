import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductRatingService } from './product-rating.service';

// @UsePipes(ValidationPipe) // will validate entire controller
@Controller('product-rating')
export class ProductRatingController {
  constructor(private readonly productRatingService: ProductRatingService) {
    console.log('instantiated in controller product rating');
  }

  @Get()
  find(@Query() query: any) {
    return this.productRatingService.find(query);
  }

  // Validation Pipe will validate only in this controller
  @Post()
  create(@Body(ValidationPipe) body: any) {
    return this.productRatingService.create(body);
  }
}
