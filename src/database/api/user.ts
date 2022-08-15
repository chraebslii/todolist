import { Request, Response } from "express";
import { User } from "../entity/User";
import { Connection } from "../connection";

export const getAllUsers = async (req: Request, res: Response) => {
	const data = await Connection.then(async database => {
		return await database.getRepository(User).find();
	});
	await res.status(200).json(data);
};

export const getSingleUser = async (req: Request, res: Response) => {
	const id = req.params.id;
	const data = await Connection.then(async database => {
		return await database.getRepository(User).find({ where: { id: id } });
	});
	await res.status(200).json(data);
};
