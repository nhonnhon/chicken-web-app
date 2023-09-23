import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ChickenCreatePayloadDto } from './chicken-create-payload.dto';
import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { StatusEnum } from '@/common/constants/status.enum';
import { Type } from 'class-transformer';

export class ChickenUpdatePayloadDto extends PartialType(
  ChickenCreatePayloadDto,
) {
  @ApiProperty({
    description: 'Chicken id',
  })
  @IsNumber()
  @IsInt()
  id: number;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Chicken status',
  })
  @IsOptional()
  @Type(() => String)
  readonly status?: StatusEnum;

  @ApiProperty({
    description: 'Updated by',
  })
  @IsNumber()
  @IsInt()
  updated_by: number;
}
