import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetListDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(19)
  limit: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  offset: number;
}
