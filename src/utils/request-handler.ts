import { SetState } from "@interfaces/react";
import { ResponseError } from "@interfaces/error";
import axios from "axios";

export const requestHandler = <T>(method: "POST" | "PUT", path: string, body: any, setError?: SetState<ResponseError>) => {
	return axios
		.request({ method, url: `${ process.env.API_URL }${ path }`, data: body })
		.then((res) => res.data as T)
		.catch((err) => {
			setError({ message: err.message, code: err.code });
			throw err as ResponseError;
		});
};
