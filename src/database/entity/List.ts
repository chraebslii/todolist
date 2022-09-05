import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Task } from "./Task";

@Entity()
export class List {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@ManyToOne(() => User)
	@Column({ type: "uuid" })
	userID: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@OneToMany(() => Task, task => task.listID)
	@JoinColumn()
	tasks: Task[];
}
