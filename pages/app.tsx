import React from "react";
import Layout from "../components/common/Layout";
import { Box, Container } from "@mui/material";

export default class App extends React.Component {
	render() {
		return (
			<>
				<Layout title={"App"}>
					<Box>
						<main>
							<Container>
								<h1>App</h1>
							</Container>
						</main>
					</Box>
				</Layout>
			</>
		);
	}
}
