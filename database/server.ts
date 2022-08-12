import { getAllUsers, getSingleUser } from "./api/user";
import { getAllLists, getSingleList } from "./api/list";
import { getAllTasks, getSingleTask } from "./api/task";

const express = require("express");
require("dotenv").config();

const app = express();

// init
app.get("/", (req, res) => res.status(200).json({ status: "ok" }));

// users
app.get("/api/user/all", getAllUsers);
app.get("/api/user/id/:id", getSingleUser);

// lists
app.get("/api/list/all", getAllLists);
app.get("/api/list/id/:id", getSingleList);

// tasks
app.get("/api/task/all", getAllTasks);
app.get("/api/task/id/:id", getSingleTask);

app.listen(+process.env.DB_SERVER_PORT, () => {
	console.log(`Server started on port ${+process.env.DB_SERVER_PORT}`);
});
