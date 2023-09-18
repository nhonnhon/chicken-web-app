import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';
import { LoginResponseDto } from './dto/login-response.dto';
import { StatusEnum } from 'src/common/constants/status.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<LoginResponseDto> {
    const encryptPassword = md5(pass);
    this.logger.log(`[LOGIN] with info: ${username} / ${encryptPassword}`);

    const user = await this.usersService.findOneByUser(username);
    if (!user) {
      throw new UnauthorizedException('Username or password is incorrect.');
    }

    const isValidPassword = encryptPassword === user.password;
    if (!isValidPassword) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }

    if (user.status !== StatusEnum.ACTIVE) {
      throw new UnauthorizedException('User is not active.');
    }

    const payload = { id: user.id, username: user.user_name };

    const accessToken = await this.jwtService.signAsync(payload);
    return {
      user,
      accessToken,
    };
  }
}
