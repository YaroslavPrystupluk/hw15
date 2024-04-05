import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTitleOnHeaderInNewpost1712231374614 implements MigrationInterface {
    name = 'ChangeTitleOnHeaderInNewpost1712231374614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newspost" RENAME COLUMN "title" TO "header"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "newspost" RENAME COLUMN "header" TO "title"`);
    }

}
