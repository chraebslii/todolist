import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Layout from "@components/common/Layout";
import List from "@components/app/List";

export default class App extends React.Component {
	render() {
		return (
			<>
				<Layout title={"App"}>
					<Box>
						<main>
							<Container sx={{ padding: "2rem 0" }}>
								<Stack spacing={5} direction={"column"} alignItems={"center"}>
									<List
										title={"List 1"}
										tasks={[
											{
												title: "Task 1.1",
												checked: false,
											},
											{
												title: "Task 1.2",
												checked: true,
											},
											{
												title: "Task 1.3",
												checked: false,
											},
										]}
									/>
									<List
										title={"List 2"}
										tasks={[
											{
												title: "Task 2.1",
												checked: true,
											},
											{
												title: "Task 2.2",
												checked: false,
											},
										]}
									/>
									<List
										title={"List 3"}
										tasks={[
											{
												title: "Task 3.1",
												checked: true,
											},
										]}
									/>
								</Stack>
							</Container>
						</main>
					</Box>
				</Layout>
			</>
		);
	}
}
