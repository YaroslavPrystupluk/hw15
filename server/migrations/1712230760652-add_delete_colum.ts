import { type MigrationInterface, type QueryRunner } from 'typeorm'

export class AddDeleteColum1712230760652 implements MigrationInterface {
  name = 'AddDeleteColum1712230760652'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "newspost" ADD "deleted" boolean NOT NULL DEFAULT false')
    await queryRunner.query('ALTER TABLE "user" ADD "deleted" boolean NOT NULL DEFAULT false')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "deleted"')
    await queryRunner.query('ALTER TABLE "newspost" DROP COLUMN "deleted"')
  }
}
