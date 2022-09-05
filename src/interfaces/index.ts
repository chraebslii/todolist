export type User = {
	id?: number;
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
