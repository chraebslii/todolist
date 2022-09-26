import { useState } from "react";
import axios from "axios";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import { User } from "@interfaces/entitys";
import { emailRegex, passwordRegex } from "@utils/regex";

const login = async (credentials) => {
	const { email, password } = credentials;
	const user: User = await axios.get(`${ process.env.API_URL }/user?email=${ email }`).then(res => res.data);
	try {
		if (user.password === password) {
			const session = await axios.post(`${ process.env.API_URL }/session`, { id: user.id }).then(res => res.data);
			return { user: user, token: session.token };
		} else if (!user) throw new Error("User not found");
		else throw new Error("Wrong password");
	} catch (e) {
		return { error: { message: e.message } };
	}
};

export const LoginTab = ({
	setToken, setUser, redirect,
}: {
	setToken: (string) => void; setUser: (string) => void; redirect: () => void;
}) => {
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ error, setError ] = useState("");
	const emailMatches = email.match(emailRegex);
	const passwordMatches = password.match(passwordRegex);

	const handleLogin = async (e) => {
		e.preventDefault();
		const response = await login({ email, password });
		if (response.error) {
			console.log(response.error);
			setError(response.error.message);
		} else {
			const { user, token } = response;
			console.log({ token, user });
			setToken(response.token);
			setUser(response.user);
			redirect();
		}
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
								error={ !emailMatches && email.length > 0 }
								onChange={ (e) => setEmail(e.target.value) }
								fullWidth
							/>
						</Stack>
						<Stack direction={ "row" }>
							<TextField
								type={ "password" }
								name={ "password" }
								id={ "password" }
								label={ "Password" }
								error={ !passwordMatches && password.length > 0 }
								onChange={ (e) => setPassword(e.target.value) }
								fullWidth
							/>
						</Stack>
						<Stack direction={ "row" } spacing={ 3 }>
							<Button
								variant={ "outlined" }
								size={ "large" }
								color={ "primary" }
								endIcon={ <CloseIcon /> }
								fullWidth
							>
								cancel
							</Button>
							<Button
								variant={ "contained" }
								size={ "large" }
								color={ "primary" }
								endIcon={ <LoginIcon /> }
								onClick={ handleLogin }
								disabled={ !emailMatches || !passwordMatches }
								fullWidth
							>
								Login
							</Button>
						</Stack>
						<Box>
							<span>* Pflichtfeld</span>
						</Box>
						{ error && <Alert severity={ "error" }>{ error }</Alert> }
					</Stack>
				</form>
			</section>
		</>
	);
};
