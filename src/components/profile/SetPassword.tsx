import React from "react";
import { Alert, Button, Stack, Typography } from "@mui/material";
import Password from "@components/form/Password";
import { passwordRegex } from "@utils/regex";
import { User } from "@interfaces/entitys";
import axios from "axios";

const updatePassword = async (userId: string, password: string) =>
	axios.put(`${ process.env.API_URL }/user/${ userId }`, { password: password }).then(res => res.data);

export default function SetPassword({ user }: { user: User }) {
	const [ password, setPassword ] = React.useState("");
	const [ passwordConfirm, setPasswordConfirm ] = React.useState("");

	const passwordMatches = password.match(passwordRegex);
	const buttonDisabled = !passwordMatches || password !== passwordConfirm;

	const [ savedPassword, setSavedPassword ] = React.useState(false);
	const [ error, setError ] = React.useState("");

	const handleSave = async () => {
		try {
			setSavedPassword(false);
			const newPassword = await updatePassword(user.id, password);
			setSavedPassword(true);
		} catch (e) {
			// TODO: Handle error messages
			setError(e.message);
		}
	};

	return (
		<section>
			<Typography variant={ "h5" }>Set new Password</Typography>
			<Stack direction={ "column" } spacing={ 2 } p={ "1rem 0" }>
				<Stack direction={ "row" } spacing={ 2 }>
					<Password
						password={ password }
						setPassword={ setPassword }
						label={ "Password" }
						error={ !passwordMatches && password.length > 0 } />
					<Password
						password={ passwordConfirm }
						setPassword={ setPasswordConfirm }
						label={ "Confirm Password" }
						error={ password !== passwordConfirm }
					/>
				</Stack>
				<Button
					variant={ "outlined" }
					onClick={ handleSave }
					fullWidth size={ "large" }
					disabled={ buttonDisabled }
				> Save</Button>
				{ savedPassword ? <Alert severity={ "success" }>Saved</Alert> :
					error ? <Alert severity={ "error" }>Error trying to save password: { error }</Alert> : null }
			</Stack>
		</section>
	);
}