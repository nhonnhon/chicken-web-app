import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import { AuditLogModule } from './modules/audit-log/audit-log.module';
import { ChickenModule } from './modules/chicken/chicken.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, appConfig, authConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { host, port, user, password, name, logging } =
          configService.get('database');
        return {
          type: 'postgres',
          host,
          port: +port,
          username: user,
          password: password,
          database: name,
          logging,
          entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
    AuthModule,
    AuditLogModule,
    ChickenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
