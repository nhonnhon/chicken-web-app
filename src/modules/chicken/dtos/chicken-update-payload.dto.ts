import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { ChickenCreatePayloadDto } from './chicken-create-payload.dto';
import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { StatusEnum } from '@/common/constants/status.enum';
import { Type } from 'class-transformer';

export class ChickenUpdatePayloadDto extends PartialType(
  ChickenCreatePayloadDto,
) {
  @ApiPropertyOptional({
    type: 'string',
    description: 'Chicken status',
  })
  @IsOptional()
  @Type(() => String)
  readonly status?: StatusEnum;

  @ApiPropertyOptional({
    description: 'Updated by',
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  updated_by?: number;
}
