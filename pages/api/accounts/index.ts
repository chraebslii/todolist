import { NextApiRequest, NextApiResponse } from "next";
import { Accounts } from "@utils/accounts";

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (!Array.isArray(Accounts)) {
			throw new Error("Cannot find user data");
		}
		res.status(200).json(Accounts);
	} catch (err: any) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
};

export default handler;
