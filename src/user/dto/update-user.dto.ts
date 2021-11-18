import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// partial use to apply dto that similar
export class UpdateUserDto extends PartialType(CreateUserDto) {}
