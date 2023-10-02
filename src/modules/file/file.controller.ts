import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from '@/common/aws/aws-s3.service';

@ApiTags('File')
@Controller('files')
export class FileController {
  constructor(private readonly awsS3Service: AwsS3Service) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Upload a file',
    description: 'Upload a file',
  })
  @ApiOkResponse()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.awsS3Service.uploadFile(file.buffer, file.originalname);
  }
}
