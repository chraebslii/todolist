import React from "react";
import Layout from "../components/common/Layout";
import { Box, Container } from "@mui/material";

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
