import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);

  const {
    http: { port },
  } = configService.get('app');
  const logger = new Logger();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
      skipMissingProperties: false,
      validationError: {
        target: false,
      },
    }),
  );

  await app.listen(port, '0.0.0.0');
  logger.log(`==========================================================`);
  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
  logger.log(`==========================================================`);
  logger.log(`Documentation: http://localhost:${port}/documentation`);
  logger.log(`==========================================================`);
}
bootstrap();
