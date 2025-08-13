import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  key: string;

  @ApiProperty()
  @IsNotEmpty()
  value: any;
}
