import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AwsS3Service {
  private readonly logger = new Logger(AwsS3Service.name);
  private readonly bucket: string;
  private readonly accessKeyId: string;
  private readonly secretAccessKey: string;

  constructor(private readonly configService: ConfigService) {
    const awsConfig = configService.get('aws');

    this.bucket = awsConfig.s3.bucketName;
    this.accessKeyId = awsConfig.credentials.accessKeyId;
    this.secretAccessKey = awsConfig.credentials.secretAccessKey;
  }

  async uploadFile(
    dataBuffer: Buffer,
    fileName: string,
  ): Promise<{ key: string }> {
    this.logger.log(`Upload file name: ${fileName}`);
    const s3 = new S3({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    });

    const uploadResult = await s3
      .upload({
        Bucket: this.bucket,
        Body: dataBuffer,
        Key: `${uuid()}-${fileName}`,
      })
      .promise();

    this.logger.log(`Upload file name done with key: ${uploadResult.Key}`);

    return {
      key: uploadResult.Key,
    };
  }
}
