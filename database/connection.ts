require("dotenv").config({ path: ".env.local" });
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { List } from "./entity/List";
import { Task } from "./entity/Task";

export const Database = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USER,
	password: `${process.env.DB_PASSWORD}`,
	database: process.env.DB_NAME,
	synchronize: true,
	logging: false,
	entities: [User, List, Task],
	migrations: [],
	subscribers: [],
});

export const Connection = Database.initialize();