import { Request, Response } from "express";
import { List } from "../entity/List";
import { Connection } from "../connection";
import { customError, namedNotFound204, notFound204 } from "../error/errorCodes";

export const getAllLists = async (req: Request, res: Response) => {
	const data = await Connection.then(async database => {
		try {
			return await database.getRepository(List).find();
		} catch (error) {
			customError(res, () => notFound204("Lists"));
		}
	});
	res.status(200).json(data);
};

export const getSingleList = async (req: Request, res: Response) => {
	const id = req.params.id;
	const data = await Connection.then(async database => {
		try {
			return await database.getRepository(List).find({ where: { id: id } });
		} catch (error) {
			customError(res, () => namedNotFound204("List", "id", id));
		}
	});
	res.status(200).json(data);
};

export const getListsAndTasksWithUser = async (req: Request, res: Response) => {
	const userID = req.params.id;
	const data = await Connection.then(async database => {
		try {
			return await database.getRepository(List).find({ where: { userID: userID }, relations: ["tasks"] });
		} catch (error) {
			customError(res, () => namedNotFound204("List", "userId", userID));
		}
	});
	res.status(200).json(data);
};
