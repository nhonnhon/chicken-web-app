import { UserEntity } from '@/modules/user/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdminUser1694623007232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(UserEntity).save({
      id: 1,
      user_name: 'admin',
      password: '21232f297a57a5a743894a0e4a801fc3',
    });
  }

  public async down(): Promise<void> {
    //
  }
}
