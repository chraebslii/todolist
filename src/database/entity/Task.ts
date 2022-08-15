import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./List";

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ default: false })
	checked: boolean;

	@Column({ nullable: true })
	description: string;

	@ManyToOne(() => List)
	@Column()
	listID: number;
}
