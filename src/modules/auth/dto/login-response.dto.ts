import { UserEntity } from '@/modules/user/entities/user.entity';

export class LoginResponseDto {
  user: UserEntity;
  accessToken: string;
}
