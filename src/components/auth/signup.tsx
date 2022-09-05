import { Box, Button, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState } from "react";
import axios from "axios";

const signup = async credentials => {
	return await axios.post(`${process.env.API_URL}/auth/signup`, credentials).then(res => res.data);
};

export const SignupTab = ({
	setToken,
	setUser,
	redirect,
}: {
	setToken: (string) => void;
	setUser: (string) => void;
	redirect: () => void;
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [username, setUsername] = useState("");

	const handleSignup = async e => {
		e.preventDefault();
		const response = await signup({
			email,
			password,
			username,
		});
		setToken(response.token);
		setUser(response.user);
		redirect();
	};

	return (
		<>
			<section>
				<form action={""}>
					<Stack direction={"column"} spacing={1}>
						<Stack direction={"row"}>
							<TextField
								name={"username"}
								id={"username"}
								label={"Username"}
								fullWidth={true}
								onChange={e => setUsername(e.target.value)}
							/>
						</Stack>
						<Stack direction={"row"}>
							<TextField
								type={"email"}
								name={"email"}
								id={"email"}
								label={"E-Mail"}
								fullWidth={true}
								onChange={e => setEmail(e.target.value)}
							/>
						</Stack>
						<Stack direction={"row"} spacing={1}>
							<TextField
								type={"password"}
								name={"password"}
								id={"password"}
								label={"Password"}
								fullWidth={true}
								onChange={e => setPassword(e.target.value)}
							/>
							<TextField
								type={"password"}
								name={"repeat-password"}
								id={"repeat-password"}
								label={"repeat Password"}
								fullWidth={true}
								onChange={e => setPasswordConfirm(e.target.value)}
							/>
						</Stack>
						<Stack direction={"row"} spacing={1}>
							<Button
								variant={"outlined"}
								size={"large"}
								color={"primary"}
								endIcon={<CloseIcon />}
								fullWidth={true}>
								cancel
							</Button>
							<Button
								variant={"contained"}
								size={"large"}
								color={"primary"}
								endIcon={<PersonAddIcon />}
								fullWidth={true}
								onClick={handleSignup}>
								Signup
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