import { Request, Response } from "express";
import { Task } from "../entity/Task";
import { Connection } from "../connection";
import { customError, namedNotFound204, notFound204 } from "../error/errorCodes";

export const getAllTasks = async (req: Request, res: Response) => {
	const data = await Connection.then(async database => {
		try {
			return await database.getRepository(Task).find();
		} catch (error) {
			customError(res, () => notFound204("Tasks"));
		}
	});
	res.status(200).json(data);
};

export const getSingleTask = async (req: Request, res: Response) => {
	const id = req.params.id;
	const data = await Connection.then(async database => {
		try {
			return await database.getRepository(Task).find({ where: { id: id } });
		} catch (error) {
			customError(res, () => namedNotFound204("Task", "id", id));
		}
	});
	res.status(200).json(data);
};
