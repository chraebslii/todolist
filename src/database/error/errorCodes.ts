import { Response } from "express";
import { ErrorFn } from "@interfaces/error";

export const notFound204 = (item: string) => {
	return {
		status: 204,
		message: `${item} not found`,
	};
};
export const namedNotFound204 = (item: string, name: string, id: number) => {
	return {
		status: 204,
		message: `${item} with ${name} '${id}' not found`,
	};
};

export const server500 = () => {
	return {
		status: 500,
		message: "An unknown server error happened.",
	};
};

export const customError = (res: Response, errorFn: ErrorFn): Response => {
	const e = errorFn();
	res.status(200).json({ status: e.status, message: e.message });
};

export const customResponse = (res: Response, errorFn: ErrorFn): Response => {
	const e = errorFn();
	res.status(200).json({ status: e.status, message: e.message });
};

