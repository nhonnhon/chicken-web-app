import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOneByUser(username: string): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.user_name = :username', { username })
      .getOne();
  }
}
