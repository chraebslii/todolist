import { NextApiRequest, NextApiResponse } from "next";
import { Tasklists } from "@utils/tasklists";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (!Array.isArray(Tasklists)) {
			throw new Error("Cannot find user data");
		}
		res.status(200).json(Tasklists);
	} catch (err: any) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default handler;
