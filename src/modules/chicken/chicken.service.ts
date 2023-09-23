import { InjectRepository } from '@nestjs/typeorm';
import { ChickenEntity } from './entities/chicken.entity';
import { Repository } from 'typeorm';
import { ForbiddenException, Logger, NotFoundException } from '@nestjs/common';
import { ChickenCreatePayloadDto } from './dtos/chicken-create-payload.dto';
import { StatusEnum } from '@/common/constants/status.enum';
import { AuditLogService } from '../audit-log/audit-log.service';
import {
  AuditLogActionEnum,
  AuditLogTableEnum,
} from '@/common/constants/audit-log.enum';
import { ChickenUpdatePayloadDto } from './dtos/chicken-update-payload.dto';

export class ChickenService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(ChickenEntity)
    private chickenRepository: Repository<ChickenEntity>,
    private readonly auditLogService: AuditLogService,
  ) {}

  async findOneById(id: number): Promise<ChickenEntity> {
    const chicken = await this.chickenRepository
      .createQueryBuilder('chicken')
      .where('chicken.id = :id', { id })
      .getOne();

    if (!chicken) {
      throw new NotFoundException(`Not found Chicken with ID: ${id}`);
    }

    return chicken;
  }

  async create(
    createChickenDto: ChickenCreatePayloadDto,
    userId: number,
  ): Promise<ChickenEntity> {
    this.logger.log(
      `[CHICKEN SERVICE] create new chicken: ${JSON.stringify(
        createChickenDto,
      )}`,
    );
    const chickenDataResponse = await this.chickenRepository.save({
      ...createChickenDto,
      created_by: userId,
      updated_by: userId,
    });

    await this.auditLogService.create({
      tableName: AuditLogTableEnum.CHICKEN,
      userId: userId,
      recordId: chickenDataResponse.id,
      action: AuditLogActionEnum.CREATE,
      oldValue: {},
      newValue: {},
    });

    return chickenDataResponse;
  }

  async update(entity: ChickenUpdatePayloadDto): Promise<ChickenEntity> {
    return await this.chickenRepository.save(entity);
  }

  private validateBeforeAction(chicken: ChickenEntity, userId: number) {
    if (!chicken) {
      throw new NotFoundException('Not found chicken');
    }

    if (chicken.created_by !== userId) {
      throw new ForbiddenException(`Only chicken owner can delete`);
    }
  }

  async updateChicken(
    id: number,
    userId: number,
    dataUpdate: ChickenUpdatePayloadDto,
  ): Promise<string> {
    this.logger.log(`[CHICKEN SERVICE] update chicken id: ${id}`);
    const chicken = await this.findOneById(id);

    this.validateBeforeAction(chicken, userId);

    await this.update({
      ...chicken,
      ...dataUpdate,
      updated_by: userId,
    });

    await this.auditLogService.create({
      tableName: AuditLogTableEnum.CHICKEN,
      userId: userId,
      recordId: id,
      action: AuditLogActionEnum.UPDATE,
      oldValue: { ...chicken },
      newValue: { ...dataUpdate },
    });

    return `Update id: ${id} success`;
  }

  async deleteChicken(id: number, userId: number): Promise<string> {
    this.logger.log(`[CHICKEN SERVICE] delete chicken id: ${id}`);
    const chicken = await this.findOneById(id);

    this.validateBeforeAction(chicken, userId);

    await this.update({
      ...chicken,
      status: StatusEnum.DELETED,
      updated_by: userId,
    });

    await this.auditLogService.create({
      tableName: AuditLogTableEnum.CHICKEN,
      userId: userId,
      recordId: id,
      action: AuditLogActionEnum.DELETE,
      oldValue: {
        status: chicken.status,
      },
      newValue: {
        status: AuditLogActionEnum.DELETE,
      },
    });

    return `Delete id: ${id} success`;
  }
}
