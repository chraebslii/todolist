import { Connection, Database } from "./connection";
import { User } from "./entity/User";
import { List } from "./entity/List";
import { Task } from "./entity/Task";

Connection.then(async () => {
	console.log("Inserting new users into the database...");
	const userIDs = [];
	for (const user of getUsers()) {
		await Database.getRepository(User).save(user);
		console.log("Saved a new user with id: " + user.id);
		userIDs.push(user.id);
	}

	console.log("Inserting new lists into the database...");
	const listIDs = [];
	for (const list of getLists(userIDs)) {
		await Database.getRepository(List).save(list);
		console.log("Saved a new list with id: " + list.id);
		listIDs.push(list.id);
	}

	console.log("Inserting new tasks into the database...");
	const taskIDs = [];
	for (const task of getTasks(listIDs)) {
		await Database.getRepository(Task).save(task);
		console.log("Saved a new task with id: " + task.id);
		taskIDs.push(task.id);
	}

	console.log("Loading data from the database...");
	const users = await Database.getRepository(User).find();
	const lists = await Database.getRepository(List).find();
	const tasks = await Database.getRepository(Task).find();

	console.log("Loaded users: ", users);
	console.log("Loaded lists: ", lists);
	console.log("Loaded tasks: ", tasks);
}).catch(error => console.log(error));

const getUsers = () => {
	const user1 = new User();
	user1.username = "user1";
	user1.email = "user1@example.com";
	user1.password = "user1";

	const user2 = new User();
	user2.username = "user2";
	user2.email = "user2@example.com";
	user2.password = "user2";

	return [user1, user2];
};

const getLists = userIDs => {
	const list1User1 = new List();
	list1User1.name = "List 1 User 1";
	list1User1.description = null;
	list1User1.userID = userIDs[0];

	const list2User1 = new List();
	list2User1.name = "List 2 User 1";
	list2User1.description = null;
	list2User1.userID = userIDs[0];

	return [list1User1, list2User1];
};

const getTasks = taskIDs => {
	const task1List1 = new Task();
	task1List1.name = "Task 1.1";
	task1List1.description = null;
	task1List1.checked = false;
	task1List1.listID = taskIDs[0];

	const task2List1 = new Task();
	task2List1.name = "Task 1.2";
	task2List1.description = null;
	task2List1.checked = true;
	task2List1.listID = taskIDs[0];

	const task1List2 = new Task();
	task1List2.name = "Task 2.1";
	task1List2.description = null;
	task1List2.checked = false;
	task1List2.listID = taskIDs[1];

	return [task1List1, task2List1, task1List2];
};
