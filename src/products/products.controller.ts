import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductsService) {
    console.log('instantiated in controller');
  }
}
