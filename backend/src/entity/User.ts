import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@ObjectType()
@Entity('user')
export class User extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: number;

	@Field(() => String)
	@Column('text', { unique: true })
	usercode: string;

	@Field(() => String)
	@Column({ type: 'text' })
	password: string;

	@Field(() => String)
	@Column('text')
	name: string;

	// --- internal --- //
	@Field(() => Boolean)
	@Column('boolean', { default: false })
	disabled: boolean; // disabled user will no be able to log in

	@Field(() => Date)
	@CreateDateColumn()
	created_at: Date;

	@Field(() => Date)
	@UpdateDateColumn()
	updated_at: Date;
}
