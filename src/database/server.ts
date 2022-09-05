import { getAllUsers, getSingleUser } from "./api/user";
import { getAllLists, getListsAndTasksWithUser, getSingleList } from "./api/list";
import { getAllTasks, getSingleTask } from "./api/task";
import { loginUser, registerUser } from "./api/auth";

const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

const app = express();
app.use(cors());
app.use(express.json());

// init
app.get("/", (req, res) => res.status(200).json({ status: "ok" }));

// auth
app.post("/api/auth/login", loginUser);
app.post("/api/auth/signup", registerUser);

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
