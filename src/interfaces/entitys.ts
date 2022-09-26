export type User = {
	id: string;
	username: string;
	email: string;
	password: string;
	lastLogin: string;
	sessions: Session[];
};

export type TaskList = {
	id: string;
	userId: string;
	name: string;
	description: string;
	tasks?: TaskItem[];
};

export type TaskItem = {
	id: string;
	name: string;
	checked: boolean;
	description: string;
	listId: string;
};

export type Session = {
	id: string;
	userId: string;
	token: string;
	createdAt: Date;
	active: boolean;
}