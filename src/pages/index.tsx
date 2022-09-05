import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Layout from "@components/Layout";

export default class Index extends React.Component {
	render() {
		return (
			<>
				<Layout title={"Index"}>
					<Box>
						<main>
							<Container sx={{ padding: "2rem 0" }}>
								<Stack spacing={5} direction={"column"}>
									<Box>
										<section>
											<Typography variant="h3" component={"span"}>
												Welcome to Todolist
											</Typography>
											<Typography variant="h4" component={"span"}>
												{" "}
												- the best todolist ever!
											</Typography>
										</section>
									</Box>
									<Box>
										<section>
											<Stack spacing={3} direction={"row"}>
												<Button
													href={"/auth?tab=signup&source=/"}
													variant="contained"
													size={"medium"}
													color="primary"
													endIcon={<KeyboardArrowRightIcon />}>
													Get Started
												</Button>
												<Button
													href={"/auth?tab=login&source=/"}
													variant="outlined"
													size={"medium"}
													color="primary"
													endIcon={<AccountCircleIcon />}>
													or Login
												</Button>
											</Stack>
										</section>
									</Box>
								</Stack>
							</Container>
						</main>
					</Box>
				</Layout>
			</>
		);
	}
}
