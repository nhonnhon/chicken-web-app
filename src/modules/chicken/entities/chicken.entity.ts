import { StatusEnum } from 'src/common/constants/status.enum';
import { AbstractEntity } from 'src/common/entities';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'chicken',
})
export class ChickenEntity extends AbstractEntity {
  @Column({ unique: true, type: 'varchar', length: 100 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 500 })
  description?: string;

  @Column({ nullable: true, type: 'integer' })
  price?: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;

  @Column()
  photo1: string;

  @Column({ nullable: true })
  photo2?: string;

  @Column({ nullable: true })
  photo3?: string;

  @Column({ nullable: true })
  ytb_link?: string;

  @Column({ nullable: true })
  tiktok_link?: string;
}
