import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaSync1636894309853 implements MigrationInterface {
  name = 'SchemaSync1636894309853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6e1de41532ad6af403d3ceb4f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6e1de41532ad6af403d3ceb4f2" ON "event" ("name", "type") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6e1de41532ad6af403d3ceb4f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "name" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6e1de41532ad6af403d3ceb4f2" ON "event" ("type", "name") `,
    );
  }
}
