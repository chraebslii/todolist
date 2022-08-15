// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
	id: number;
	name: string;
	userName: string;
	password: string;
	email: string;
};

export type TaskList = {
	id?: number;
	name: string;
	tasks?: TaskItem[];
};

export type TaskItem = {
	id?: number;
	name: string;
	checked: boolean;
};
