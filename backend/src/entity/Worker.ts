import { Field, ID, ObjectType } from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Company } from "./Company";

@ObjectType()
@Entity('worker')
export class Worker {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column('text', {unique: true})
    usercode: string;

    @Field(() => String)
    @Column('text')
    name: string;

    @Field(() => GraphQLJSONObject)
    @Column({ type: 'json'})
    others: JSON; 
// TODO: añadir las cosas mas destacables del worker y latitud longitud, resto van al campo others

    @Field(() => Company)
    @ManyToOne(() => Company, (company) => company.workers)
    company: Company;

    // --- internal --- //
    @Field(() => Boolean)
    @Column('boolean', {default: false})
    disabled: boolean; // disabled worker will be able to be part of any company

    @Field(() => Date)
    @CreateDateColumn()
    created_at: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updated_at: Date;
}
