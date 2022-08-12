import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class List {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User)
	@Column()
	userID: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;
}
