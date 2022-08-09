import React from "react";
import Layout from "../components/common/Layout";
import { Box, Container, Stack } from "@mui/material";

export default class App extends React.Component {
	render() {
		return (
			<>
				<Layout title={"App"}>
					<Box>
						<main>
							<Container sx={{ padding: "2rem 0" }}>
								<Stack spacing={5} direction={"column"} alignItems={"center"}></Stack>
							</Container>
						</main>
					</Box>
				</Layout>
			</>
		);
	}
}
