import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { jwtSecretKey, jwtExpiresIn } = configService.get('auth');

        return {
          signOptions: {
            expiresIn: jwtExpiresIn,
            algorithm: 'HS256',
          },
          verifyOptions: {
            algorithms: ['HS256'],
            ignoreExpiration: false,
          },
          secret: jwtSecretKey,
        };
      },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
