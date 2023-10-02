import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { AwsModule } from '@/common/aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [FileController],
  providers: [],
  exports: [],
})
export class FileModule {}
