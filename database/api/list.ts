import { Request, Response } from "express";
import { List } from "../../database/entity/List";
import { Connection } from "../connection";

export const getAllLists = async (req: Request, res: Response) => {
	const data = await Connection.then(async database => {
		return await database.getRepository(List).find();
	});
	await res.status(200).json(data);
};

export const getSingleList = async (req: Request, res: Response) => {
	const id = req.params.id;
	const data = await Connection.then(async database => {
		return await database.getRepository(List).find({ where: { id: id } });
	});
	await res.status(200).json(data);
};
