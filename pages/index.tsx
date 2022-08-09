import React from "react";
import Layout from "../components/common/Layout";
import { Box, Container } from "@mui/material";

export default class Index extends React.Component {
	render() {
		return (
			<>
				<Layout title={"Index"}>
					<Box>
						<main>
							<Container>
								<h1>Start</h1>
							</Container>
						</main>
					</Box>
				</Layout>
			</>
		);
	}
}
