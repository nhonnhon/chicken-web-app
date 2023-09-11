import { Exclude } from 'class-transformer';
import { StatusEnum } from 'src/common/constants/status.enum';
import { AbstractEntity } from 'src/common/entities';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity extends AbstractEntity {
  @Column({ unique: true, type: 'varchar', length: 20 })
  user_name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true, unique: true })
  email?: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ nullable: true })
  photo?: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;
}
