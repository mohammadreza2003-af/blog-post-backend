import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class GetUsersParamDto {
  @ApiPropertyOptional({
    name: 'Id',
    description: 'User id',
    example: 1234,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id?: number;
}
