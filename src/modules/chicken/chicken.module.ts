import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChickenEntity } from './entities/chicken.entity';
import { ChickenController } from './chicken.controller';
import { ChickenService } from './chicken.service';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([ChickenEntity]), AuditLogModule],
  controllers: [ChickenController],
  providers: [ChickenService],
  exports: [ChickenService],
})
export class ChickenModule {}
