import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
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
          entities: [],
          // entities: [__dirname + '/modules/**/*.entity{.ts,.js}'],
          // migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
