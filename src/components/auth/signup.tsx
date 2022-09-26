import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import axios from "axios";
import { User } from "@interfaces/entitys";
import { emailRegex, passwordRegex, usernameRegex } from "@utils/regex";

const signup = async credentials => {
	try {
		const usernameExists = await axios.get(`${ process.env.API_URL }/user?username=${ credentials.username }`).then(res => res.data);
		const emailExists = await axios.get(`${ process.env.API_URL }/user?email=${ credentials.email }`).then(res => res.data);
		if (usernameExists) throw new Error("Username already exists");
		if (emailExists) throw new Error("E-Mail already exists");

		const user: User = await axios.post(`${ process.env.API_URL }/user`, credentials).then(res => res.data);
		const session = await axios.post(`${ process.env.API_URL }/session`, { id: user.id }).then(res => res.data);
		return { user: user, token: session.token };
	} catch (e) {
		return { error: { message: e.message } };
	}

};

export const SignupTab = ({
	setToken, setUser, redirect,
}: {
	setToken: (string) => void; setUser: (string) => void; redirect: () => void;
}) => {
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ passwordConfirm, setPasswordConfirm ] = useState("");
	const [ username, setUsername ] = useState("");
	const [ error, setError ] = useState("");

	const emailMatches = email.match(emailRegex);
	const usernameMatches = username.match(usernameRegex);
	const passwordMatches = password.match(passwordRegex);

	const handleSignup = async e => {
		e.preventDefault();
		const response = await signup({ email, password, username });
		if (response.error) {
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
				<form action={ "" }>
					<Stack direction={ "column" } spacing={ 1 }>
						<Stack direction={ "row" }>
							<TextField
								name={ "username" }
								id={ "username" }
								label={ "Username" }
								error={ !usernameMatches && username.length > 0 }
								onChange={ e => setUsername(e.target.value) }
								fullWidth
							/>
						</Stack>
						<Stack direction={ "row" }>
							<TextField
								type={ "email" }
								name={ "email" }
								id={ "email" }
								label={ "E-Mail" }
								error={ !emailMatches && email.length > 0 }
								onChange={ e => setEmail(e.target.value) }
								fullWidth
							/>
						</Stack>
						<Stack direction={ "row" } spacing={ 1 }>
							<TextField
								type={ "password" }
								name={ "password" }
								id={ "password" }
								label={ "Password" }
								error={ !passwordMatches && password.length > 0 }
								onChange={ e => setPassword(e.target.value) }
								fullWidth
							/>
							<TextField
								type={ "password" }
								name={ "repeat-password" }
								id={ "repeat-password" }
								label={ "repeat Password" }
								error={ password !== passwordConfirm && passwordConfirm.length > 0 }
								onChange={ e => setPasswordConfirm(e.target.value) }
								fullWidth
							/>
						</Stack>
						<Stack direction={ "row" } spacing={ 1 }>
							<Button
								variant={ "outlined" }
								size={ "large" }
								color={ "primary" }
								endIcon={ <CloseIcon /> }
								fullWidth>
								cancel
							</Button>
							<Button
								variant={ "contained" }
								size={ "large" }
								color={ "primary" }
								endIcon={ <PersonAddIcon /> }
								onClick={ handleSignup }
								disabled={ !emailMatches || !passwordMatches || !usernameMatches || password !== passwordConfirm }
								fullWidth>
								Signup
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