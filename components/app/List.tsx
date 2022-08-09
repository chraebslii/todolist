import React from "react";
import { Container, Divider, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default class List extends React.Component<{
	children?: React.ReactNode;
	title?: string;
}> {
	render() {
		return (
			<>
				<Container
					maxWidth={"md"}
					sx={{
						backgroundColor: "background.paper",
					}}>
					<Stack spacing={3} direction={"column"} sx={{ height: "200px", padding: "1rem 0" }}>
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
								{this.props.children}
							</Stack>
						</section>
					</Stack>
				</Container>
			</>
		);
	}
}
