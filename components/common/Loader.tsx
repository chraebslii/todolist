import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default class Loader extends React.Component {
	render() {
		return (
			<>
				<Box
					className={"loader"}
					sx={{
						position: "absolute",
						top: "40%",
						left: "50%",
					}}>
					<CircularProgress color="primary" size={50} />
				</Box>
			</>
		);
	}
}
