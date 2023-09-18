import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginPayloadDto {
  @ApiProperty({
    description: 'Username to login',
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    description: 'Password to login',
  })
  @IsString()
  readonly password: string;
}
