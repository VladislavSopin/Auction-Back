import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1722789065378 implements MigrationInterface {
    name = 'Init1722789065378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "history" ("id" SERIAL NOT NULL, "note" character varying NOT NULL, "lotId" integer, CONSTRAINT "PK_9384942edf4804b38ca0ee51416" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_confirms" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "IP" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_34f26ccbecbc7acbc271e276716" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "role" character varying NOT NULL, "image" character varying NOT NULL, "isVerifiet" boolean NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lot" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, "lotName" character varying NOT NULL, "note" character varying NOT NULL, "cost" character varying NOT NULL, "currency" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_2ba293e2165c7b93cd766c8ac9b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lot_changes" ("id" SERIAL NOT NULL, "prevCost" character varying NOT NULL, "newCost" character varying NOT NULL, "image" character varying NOT NULL, "lotId" integer, "changerId" integer, CONSTRAINT "PK_4be26bbd14ab173c4d0a81e3155" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "refreshToken" character varying NOT NULL, "dateEnd" TIMESTAMP NOT NULL, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "history" ADD CONSTRAINT "FK_73670b95426c430e95c08a30e03" FOREIGN KEY ("lotId") REFERENCES "lot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_confirms" ADD CONSTRAINT "FK_03410a9e6bbfbae6b887af46b9e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lot" ADD CONSTRAINT "FK_d96dd0000fda7f9f94386e5b871" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lot_changes" ADD CONSTRAINT "FK_37318ccf1df78848789fe13d0a8" FOREIGN KEY ("lotId") REFERENCES "lot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lot_changes" ADD CONSTRAINT "FK_7720f7e62e625822066f703d6ae" FOREIGN KEY ("changerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lot_changes" DROP CONSTRAINT "FK_7720f7e62e625822066f703d6ae"`);
        await queryRunner.query(`ALTER TABLE "lot_changes" DROP CONSTRAINT "FK_37318ccf1df78848789fe13d0a8"`);
        await queryRunner.query(`ALTER TABLE "lot" DROP CONSTRAINT "FK_d96dd0000fda7f9f94386e5b871"`);
        await queryRunner.query(`ALTER TABLE "user_confirms" DROP CONSTRAINT "FK_03410a9e6bbfbae6b887af46b9e"`);
        await queryRunner.query(`ALTER TABLE "history" DROP CONSTRAINT "FK_73670b95426c430e95c08a30e03"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "lot_changes"`);
        await queryRunner.query(`DROP TABLE "lot"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_confirms"`);
        await queryRunner.query(`DROP TABLE "history"`);
    }

}
