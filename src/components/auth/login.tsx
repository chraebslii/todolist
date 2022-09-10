import { useState } from "react";
import axios from "axios";
import { Box, Button, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";

const login = async credentials => {
	return await axios.post(`${ process.env.API_URL }/auth/login`, credentials).then(res => res.data);
};

export const LoginTab = ({
	setToken,
	setUser,
	redirect,
}: {
	setToken: (string) => void;
	setUser: (string) => void;
	redirect: () => void;
}) => {
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");

	const handleLogin = async e => {
		e.preventDefault();
		const response = await login({
			email,
			password,
		});
		setToken(response.token);
		setUser(response.user);
		redirect();
	};

	return (
		<>
			<section>
				<form>
					<Stack direction={ "column" } spacing={ 1 }>
						<Stack direction={ "row" }>
							<TextField
								type={ "email" }
								name={ "email" }
								id={ "email" }
								label={ "E-Mail" }
								fullWidth={ true }
								onChange={ e => setEmail(e.target.value) }
							/>
						</Stack>
						<Stack direction={ "row" }>
							<TextField
								type={ "password" }
								name={ "password" }
								id={ "password" }
								label={ "Password" }
								onChange={ e => setPassword(e.target.value) }
								fullWidth={ true }
							/>
						</Stack>
						<Stack direction={ "row" } spacing={ 3 }>
							<Button
								variant={ "outlined" }
								size={ "large" }
								color={ "primary" }
								endIcon={ <CloseIcon /> }
								fullWidth={ true }>
								cancel
							</Button>
							<Button
								variant={ "contained" }
								size={ "large" }
								color={ "primary" }
								endIcon={ <LoginIcon /> }
								onClick={ handleLogin }
								fullWidth={ true }>
								Login
							</Button>
						</Stack>
						<Box>
							<span>* Pflichtfeld</span>
						</Box>
					</Stack>
				</form>
			</section>
		</>
	);
};
