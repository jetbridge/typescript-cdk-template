import { MigrationInterface, QueryRunner } from "typeorm";

export class init1607357860384 implements MigrationInterface {
    name = 'init1607357860384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "email" character varying NOT NULL, CONSTRAINT "PK_457bfa3e35350a716846b03102d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_"`);
    }

}
