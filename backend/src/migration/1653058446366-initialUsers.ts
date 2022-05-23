import { MigrationInterface, QueryRunner } from "typeorm"

export class initialUsers1653058446366 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // password are hash(1234, 12)
        await queryRunner.query(`
            insert into public.user ("usercode", "name", "password") values 
            ('C00000', 'User 1', '$2b$12$oVSfky/JGPiXs2gu6q7d3.v8Z2//UaRT8ksvRF6G5nbT13Bh5fE.m'),
            ('C00001', 'User 2', '$2b$12$oVSfky/JGPiXs2gu6q7d3.v8Z2//UaRT8ksvRF6G5nbT13Bh5fE.m'),
            ('C00002', 'User 3', '$2b$12$oVSfky/JGPiXs2gu6q7d3.v8Z2//UaRT8ksvRF6G5nbT13Bh5fE.m'),
            ('C00003', 'User 4', '$2b$12$oVSfky/JGPiXs2gu6q7d3.v8Z2//UaRT8ksvRF6G5nbT13Bh5fE.m');
        `);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            delete user where usercode in ('C00000','C00001','C00002','C00003');
        `)
    }

}
