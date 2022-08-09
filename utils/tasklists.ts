import { TaskList } from "@interfaces/index";

export const Tasklists: TaskList[] = [
	{
		id: 1,
		title: "List 1",
		tasks: [
			{
				id: 1,
				title: "Task 1.1",
				checked: false,
			},
			{
				id: 2,
				title: "Task 1.2",
				checked: false,
			},
			{
				id: 3,
				title: "Task 1.3",
				checked: true,
			},
		],
	},
	{
		id: 2,
		title: "List 2",
		tasks: [
			{
				id: 3,
				title: "Task 2.1",
				checked: true,
			},
			{
				id: 4,
				title: "Task 2.2",
				checked: false,
			},
		],
	},
	{
		id: 3,
		title: "List 3",
		tasks: [
			{
				id: 5,
				title: "Task 3.1",
				checked: true,
			},
		],
	},
];
