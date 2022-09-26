import React from "react";
import Page from "@components/common/Page";
import { Box, Button, Stack, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default class Index extends React.Component {
	render() {
		return (
			<Page name={ "Index" }>
				<Stack spacing={ 5 } direction={ "column" }>
					<section>
						<Box>
							<Typography variant="h3" component={ "span" }>
								Welcome to Todolist
							</Typography>
							<Typography variant="h4" component={ "span" }>
								{ " " }
								- the best todolist ever!
							</Typography>
						</Box>
					</section>
					<section>
						<Box>
							<Stack spacing={ 3 } direction={ "row" }>
								<Button
									href={ "/auth?tab=signup&source=/" }
									variant="contained"
									size={ "medium" }
									color="primary"
									endIcon={ <KeyboardArrowRightIcon /> }>
									Get Started
								</Button>
								<Button
									href={ "/auth?tab=login&source=/" }
									variant="outlined"
									size={ "medium" }
									color="primary"
									endIcon={ <AccountCircleIcon /> }>
									or Login
								</Button>
							</Stack>
						</Box>
					</section>
				</Stack>
			</Page>
		);
	}
}
