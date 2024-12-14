import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { contentType } from 'src/constants/constants';
export class AddToListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  contentId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(contentType)
  contentType: string;
}
