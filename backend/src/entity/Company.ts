import { Field, ID, ObjectType } from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity, PrimaryColumn } from "typeorm";
import { Worker } from './Worker'

@ObjectType()
@Entity('company')
export class Company extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn({type: Number}) // we will store same id as the API
    id: number

    @Field(() => String)
    @Column('text', {unique: true})
    company: string; // important

    @Field(() => String)
    @Column('text')
    industry: string; // important

    @Field(() => String)
    @Column('text')
    catch_phrase: string;
    
    @Field(() => String)
    @Column('text')
    logo: string;

    @Field(() => String)
    @Column('text')
    type: string; // important

    @Field(() => String)
    @Column('text')
    phone: string;

    @Field(() => GraphQLJSONObject)
    @Column({ type: 'jsonb'})
    others?: object; 

    @Field(() => [Worker])
    @OneToMany(() => Worker, (worker) => worker.company)
    workers: Worker[];

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
