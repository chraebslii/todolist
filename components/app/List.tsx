import React from "react";
import { Container, Divider, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TaskItem } from "../../interfaces";
import Task from "@components/app/Task";

export default class List extends React.Component<{
	title?: string;
	tasks?: TaskItem[];
}> {
	render() {
		return (
			<>
				<Container
					maxWidth={"md"}
					sx={{
						backgroundColor: "background.paper",
					}}>
					<Stack spacing={3} direction={"column"} sx={{ padding: "1rem 0" }}>
						<section>
							<Stack
								direction={"row"}
								spacing={5}
								sx={{
									justifyContent: "space-between",
									alignItems: "center",
								}}>
								<Typography variant={"h5"}>{this.props.title}</Typography>
								<IconButton aria-label="add item" color={"primary"}>
									<AddIcon />
								</IconButton>
							</Stack>
							<Divider />
						</section>

						<section>
							<Stack spacing={3} direction={"column"}>
								{this.props.tasks &&
									this.props.tasks.map(task => {
										if (!task.checked) {
											return <Task {...task} />;
										}
									})}
							</Stack>
						</section>

						<section>
							<details>
								<summary className={"no-marker"}>
									<Divider>show done items</Divider>
								</summary>
								<Stack spacing={3} direction={"column"}>
									{this.props.tasks &&
										this.props.tasks.map(task => {
											if (task.checked) {
												return <Task {...task} />;
											}
										})}
								</Stack>
							</details>
						</section>
					</Stack>
				</Container>
			</>
		);
	}
}
