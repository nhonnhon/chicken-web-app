import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1695484801708 implements MigrationInterface {
  name = 'Init1695484801708';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."chicken_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'DELETED', 'SOLD')`,
    );
    await queryRunner.query(
      `CREATE TABLE "chicken" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "name" character varying(100) NOT NULL, "description" character varying(500), "price" integer, "status" "public"."chicken_status_enum" NOT NULL DEFAULT 'ACTIVE', "photo1" character varying NOT NULL, "photo2" character varying, "photo3" character varying, "ytb_link" character varying, "tiktok_link" character varying, CONSTRAINT "UQ_e382b16fde42b41e97e13e720c0" UNIQUE ("name"), CONSTRAINT "PK_1cb4ebaee92f7a92df421925a2a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "audit_log" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "table_name" character varying NOT NULL, "user_id" integer NOT NULL, "record_id" integer NOT NULL, "action" character varying NOT NULL, "old_value" jsonb NOT NULL, "new_value" jsonb NOT NULL, CONSTRAINT "PK_07fefa57f7f5ab8fc3f52b3ed0b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'DELETED', 'SOLD')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" integer, "user_name" character varying(20) NOT NULL, "password" character varying NOT NULL, "email" character varying, "phone_number" character varying, "photo" character varying, "status" "public"."user_status_enum" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UQ_d34106f8ec1ebaf66f4f8609dd6" UNIQUE ("user_name"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    await queryRunner.query(`DROP TABLE "audit_log"`);
    await queryRunner.query(`DROP TABLE "chicken"`);
    await queryRunner.query(`DROP TYPE "public"."chicken_status_enum"`);
  }
}
