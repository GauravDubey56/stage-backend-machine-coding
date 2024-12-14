import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(19)
  limit: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  offset: number;
}
