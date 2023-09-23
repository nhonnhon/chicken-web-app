import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class ChickenCreatePayloadDto {
  @ApiProperty({
    description: 'Chicken name',
  })
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Chicken description',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;

  @ApiPropertyOptional({
    description: 'Chicken price',
  })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(1)
  price?: number;

  @ApiProperty({
    description: 'Photo 1',
  })
  @IsString()
  readonly photo1: string;

  @ApiPropertyOptional({
    description: 'Photo 2',
  })
  @IsOptional()
  @IsString()
  readonly photo2?: string;

  @ApiPropertyOptional({
    description: 'Photo 3',
  })
  @IsOptional()
  @IsString()
  readonly photo3?: string;

  @ApiPropertyOptional({
    description: 'Link youtube',
  })
  @IsOptional()
  @IsString()
  readonly ytb_link?: string;

  @ApiPropertyOptional({
    description: 'Link tiktok',
  })
  @IsOptional()
  @IsString()
  readonly tiktok_link?: string;
}
