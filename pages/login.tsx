import React from "react";
import { Box, Container } from "@mui/material";
import Layout from "@components/common/Layout";

export default class Login extends React.Component {
	render() {
		return (
			<>
				<Layout title={"Login"}>
					<Box>
						<main>
							<Container>
								<h1>Login</h1>
							</Container>
						</main>
					</Box>
				</Layout>
			</>
		);
	}
}
