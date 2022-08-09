import React from "react";
import Layout from "../components/common/Layout";
import { Box, Container, Stack } from "@mui/material";
import List from "../components/app/List";

export default class App extends React.Component {
	render() {
		return (
			<>
				<Layout title={"App"}>
					<Box>
						<main>
							<Container sx={{ padding: "2rem 0" }}>
								<Stack spacing={5} direction={"column"} alignItems={"center"}>
									<List title={"List 1"}></List>
									<List title={"List 2"}></List>
									<List title={"List 3"}></List>
								</Stack>
							</Container>
						</main>
					</Box>
				</Layout>
			</>
		);
	}
}
