import { StatusEnum } from '@/common/constants/status.enum';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class GetChickenPaginationDto extends PaginationDto {
  @ApiPropertyOptional({
    example: StatusEnum.ACTIVE,
  })
  @Type(() => String)
  @IsEnum(StatusEnum)
  @IsOptional()
  readonly status?: string;
}
