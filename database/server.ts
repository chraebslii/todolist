import { getAllUsers, getSingleUser } from "./api/user";
import { getAllLists, getListsAndTasksWithUser, getSingleList } from "./api/list";
import { getAllTasks, getSingleTask } from "./api/task";

const express = require("express");
require("dotenv").config({ path: ".env.local" });
const cors = require("cors");

const app = express();
app.use(cors());

// init
app.get("/", (req, res) => res.status(200).json({ status: "ok" }));

// users
app.get("/api/user/all", getAllUsers);
app.get("/api/user/id/:id", getSingleUser);

// lists
app.get("/api/list/all", getAllLists);
app.get("/api/list/id/:id", getSingleList);
app.get("/api/list/user/:userID", getListsAndTasksWithUser);

// tasks
app.get("/api/task/all", getAllTasks);
app.get("/api/task/id/:id", getSingleTask);

app.listen(+process.env.DB_SERVER_PORT, () => {
	console.log(`Server started on port ${+process.env.DB_SERVER_PORT}`);
});
