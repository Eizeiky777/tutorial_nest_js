import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(
      '🚀 ~ file: parse-int.pipe.ts ~ line 11 ~ ParseIntPipe ~ transform ~ metadata',
      metadata,
    );
    const val = parseInt(value, 10);
    console.log(
      '🚀 ~ file: parse-int.pipe.ts ~ line 16 ~ ParseIntPipe ~ transform ~ val',
      val,
    );
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed "${val}" is not an integer. `,
      );
    }

    return value;
  }
}
