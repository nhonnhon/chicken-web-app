import { ENUM_NODE_ENV } from '@/common/constants/env.enum';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, unknown> => ({
    env: process.env.ENVIRONMENT_NAME ?? ENUM_NODE_ENV.DEVELOPMENT,
    http: {
      host: process.env.HTTP_HOST || 'localhost',
      port: process.env.HTTP_PORT
        ? Number.parseInt(process.env.HTTP_PORT)
        : 3900,
    },
    version: process.env.API_VERSION ?? 'v1.0.0',
    documentationEnabled: process.env.ENABLE_DOCUMENTATION ?? false,
  }),
);
