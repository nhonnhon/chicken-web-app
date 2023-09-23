import { ChickenEntity } from '@/modules/chicken/entities/chicken.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChicken1695484887891 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(ChickenEntity).save({
      name: 'Gà tía mật',
      photo1: 'dummy',
    });
  }

  public async down(): Promise<void> {
    //
  }
}
