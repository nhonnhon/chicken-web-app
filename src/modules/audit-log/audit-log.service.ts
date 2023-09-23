import { Repository } from 'typeorm';
import { AuditLogEntity } from './entities/audit-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLogEntity)
    private readonly auditLogRepository: Repository<AuditLogEntity>,
  ) {}

  async create({
    tableName,
    userId,
    recordId,
    action,
    newValue,
    oldValue,
  }: CreateAuditLogDto) {
    const auditLogEntity = new AuditLogEntity();

    auditLogEntity.table_name = tableName;
    auditLogEntity.user_id = userId;
    auditLogEntity.record_id = recordId;
    auditLogEntity.action = action;
    auditLogEntity.old_value = oldValue;
    auditLogEntity.new_value = newValue;

    return await this.auditLogRepository.save(auditLogEntity);
  }
}
