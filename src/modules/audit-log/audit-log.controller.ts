import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Audit Log')
@Controller('audit-log')
export class AuditLogController {
  @Get()
  @ApiOkResponse({
    description: 'List of audit log',
  })
  findAllLogOfARecord() {
    return '';
  }
}
