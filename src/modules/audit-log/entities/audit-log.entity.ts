import { AbstractEntity } from '@/common/entities';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'audit_log',
})
export class AuditLogEntity extends AbstractEntity {
  @Column({ type: 'varchar' })
  table_name: string;

  @Column({
    type: 'integer',
  })
  user_id: number;

  @Column({ type: 'integer' })
  record_id: number;

  @Column({ type: 'varchar' })
  action: string;

  @Column({ type: 'jsonb' })
  old_value: Record<string, unknown>;

  @Column({ type: 'jsonb' })
  new_value: Record<string, unknown>;
}
