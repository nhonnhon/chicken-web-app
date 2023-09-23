import { IsInt, IsNumber, IsObject, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAuditLogDto {
  @ApiProperty({
    description: 'Table name',
  })
  @IsString()
  tableName: string;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  recordId: number;

  @ApiProperty()
  @IsString()
  action: string;

  @ApiProperty()
  @IsObject()
  oldValue: Record<string, unknown>;

  @ApiProperty()
  @IsObject()
  newValue: Record<string, unknown>;
}
