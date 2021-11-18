/* eslint-disable @typescript-eslint/no-unused-vars */
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  @Type(() => Number)
  readonly class: number;

  @IsString({ each: true })
  readonly skills: string[];

  @IsOptional()
  @IsArray()
  readonly books: [];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly coin: number;
}
