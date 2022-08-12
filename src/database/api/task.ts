import { Request, Response } from "express";
import { Task } from "../entity/Task";
import { Connection } from "../connection";

export const getAllTasks = async (req: Request, res: Response) => {
	const data = await Connection.then(async database => {
		return await database.getRepository(Task).find();
	});
	await res.status(200).json(data);
};

export const getSingleTask = async (req: Request, res: Response) => {
	const id = req.params.id;
	const data = await Connection.then(async database => {
		return await database.getRepository(Task).find({ where: { id: id } });
	});
	await res.status(200).json(data);
};
