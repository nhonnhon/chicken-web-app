import { registerAs } from '@nestjs/config';

export default registerAs(
  'aws',
  (): Record<string, unknown> => ({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    s3: {
      bucketName: process.env.AWS_BUCKET_NAME,
      baseUrl: `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}`,
    },
  }),
);
