import { Request, Response } from "express";
import { User } from "../entity/User";
import { Connection } from "../connection";
import { customError, namedNotFound204, notFound204 } from "../error/errorCodes";

export const getAllUsers = async (req: Request, res: Response) => {
	const data = await Connection.then(async database => {
		try {
			return await database.getRepository(User).find();
		} catch (error) {
			customError(res, () => notFound204("Users"));
		}
	});
	res.status(200).json(data);
};

export const getSingleUser = async (req: Request, res: Response) => {
	const id = req.params.id;
	const data = await Connection.then(async database => {
		try {
			return await database.getRepository(User).find({ where: { id: id } });
		} catch (error) {
			customError(res, () => namedNotFound204("User", "id", id));
		}
	});
	res.status(200).json(data);
};
