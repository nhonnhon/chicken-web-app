import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'integer',
    name: 'created_by',
    nullable: true,
  })
  created_by: number;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({
    type: 'integer',
    name: 'updated_by',
    nullable: true,
  })
  updated_by: number;
}
