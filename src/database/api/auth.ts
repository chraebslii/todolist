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
		await res.status(200).json({ status: "ok", token: createToken(data) });
	} else {
		await res.status(200).json({ status: "error", error: "Invalid credentials" });
	}
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
