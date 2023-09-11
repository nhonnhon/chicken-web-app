import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, unknown> => ({
    host: process.env?.DB_HOST ?? '127.0.0.1',
    port: process.env?.DB_PORT ?? 5432,
    name: process.env?.DB_DATABASE ?? 'stress_tracking',
    user: process.env?.DB_USERNAME,
    schema: process.env.DB_SCHEMA,
    password: process?.env.DB_PASSWORD,
    logging: process.env.DB_LOGS === 'true',
  }),
);
