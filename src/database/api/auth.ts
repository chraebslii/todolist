import { Request, Response } from "express";
import { User } from "../entity/User";
import { Connection } from "../connection";

const jwt = require("jsonwebtoken");

export const loginUser = async (req: Request, res: Response) => {
	const data = await Connection.then(async database => {
		return await database.getRepository(User).findOne({
			where: {
				email: req.body.email,
			},
		});
	});
	if (data && data.password === req.body.password) {
		await Connection.then(async database => {
			await database.getRepository(User).update(data.id, {
				lastLogin: new Date().toISOString(),
			});
		});
		await res.status(200).json({ status: "ok", token: createToken(data), user: data.id });
	} else {
		await res.status(200).json({ status: "error", error: "Invalid credentials" });
	}
};

export const registerUser = async (req: Request, res: Response) => {
	const data = await Connection.then(async database => {
		await database.getRepository(User).insert({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			lastLogin: new Date().toISOString(),
		});
		return await database.getRepository(User).findOne({
			where: {
				email: req.body.email,
			},
		});
	});
	await res.status(200).json({ status: "ok", token: createToken(data), user: data.id });
};

const secret = "secret";
const createToken = (data: User) => {
	return jwt.sign(
		{
			email: data.email,
			password: data.password,
			lastLogin: new Date(data.lastLogin).getTime(),
		},
		secret,
		{ expiresIn: "1h" }
	);
};
