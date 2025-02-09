import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1739017899456 implements MigrationInterface {
  name = 'Init1739017899456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" ADD "comment" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "comment"`);
  }
}
