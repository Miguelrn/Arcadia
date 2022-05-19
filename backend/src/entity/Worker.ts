import { Field, ID, ObjectType } from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, BaseEntity, PrimaryColumn } from "typeorm";
import { Company } from "./Company";

@ObjectType()
@Entity('worker')
export class Worker extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn({type: Number}) // we will store same id as the API
    id: number

    @Field(() => String)
    @Column('text', {unique: true})
    username: string;

    @Field(() => String)
    @Column('text')
    name: string;

    @Field(() => String)
    @Column('text')
    surname: string;

    @Field(() => String)
    @Column('text', {unique: true})
    email: string;

    @Field(() => String)
    @Column('text')
    avatar: string;

    @Field(() => String)
    @Column('text')
    gender: string;

    @Field(() => String)
    @Column('text')
    phone: string;

    @Field(() => Date)
    @Column({type: Date})
    birthdate: Date;

    @Field(() => GraphQLJSONObject)
    @Column({ type: 'jsonb'})
    others?: Object; // just to store rest of the user data, just in case

    @Field(() => Company, {nullable: true})
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
