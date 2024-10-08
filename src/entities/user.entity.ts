import { Entity, ObjectIdColumn, Column, Unique, BeforeInsert } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'

@Entity('user')
@Unique(['email'])
export class User {
	@ObjectIdColumn()
	id: ObjectId

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	password: string

	@Column()
	authId: string

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10)
	}
}
