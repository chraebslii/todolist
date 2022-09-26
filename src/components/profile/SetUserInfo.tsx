import React from "react";
import axios from "axios";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { User, UserData } from "@interfaces/entitys";
import { emailRegex, nameRegex, usernameRegex } from "@utils/regex";

const updateUserData = async (userDataId: string, userData: Partial<UserData>) =>
	axios.put(`${ process.env.API_URL }/userdata/${ userDataId }`, userData).then(res => res.data);

const updateUser = async (userId: string, user: Partial<User>) =>
	axios.put(`${ process.env.API_URL }/user/${ userId }`, user).then(res => res.data);

export default function SetUserInfo({ userData, user }: { userData: UserData, user: User }) {
	const [ firstName, setFirstName ] = React.useState(userData.firstName);
	const [ lastName, setLastName ] = React.useState(userData.lastName);
	const [ username, setUsername ] = React.useState(user.username);
	const [ email, setEmail ] = React.useState(user.email);

	const firstNameMatches = firstName.match(nameRegex);
	const lastNameMatches = lastName.match(nameRegex);
	const usernameMatches = username.match(usernameRegex);
	const emailMatches = email.match(emailRegex);

	const [ savedData, setSavedData ] = React.useState(false);
	const [ savedUser, setSavedUser ] = React.useState(false);
	const [ error, setError ] = React.useState({ data: "", user: "" });

	const handleSave = async () => {
		try {
			setSavedData(false);
			const newUserData: UserData = await updateUserData(userData.id, { firstName, lastName });
			setFirstName(newUserData.firstName);
			setLastName(newUserData.lastName);
			setSavedData(true);
		} catch (e) {
			// TODO: Handle error messages
			setError({ ...error, data: e.message });
		}

		try {
			setSavedUser(false);
			const newUser: User = await updateUser(user.id, { username, email });
			setUsername(newUser.username);
			setEmail(newUser.email);
			setSavedUser(true);
		} catch (e) {
			// TODO: Handle error messages
			setError({ ...error, user: e.message });
		}
	};

	return (
		<section>
			<Typography variant={ "h5" }>Personal Info:</Typography>
			<Stack direction={ "column" } spacing={ 2 } p={ "1rem 0" }>
				<Stack direction={ "row" } spacing={ 2 }>
					<TextField
						defaultValue={ firstName }
						label={ "First Name" }
						onChange={ e => setFirstName(e.target.value) }
						fullWidth
						error={ !firstNameMatches && firstName.length > 0 }
					/>
					<TextField
						defaultValue={ lastName }
						label={ "Last Name" }
						onChange={ e => setLastName(e.target.value) }
						fullWidth
						error={ !lastNameMatches && lastName.length > 0 }
					/>
				</Stack>
				<Stack direction={ "row" } spacing={ 2 }>
					<TextField
						inputProps={ { autoComplete: "off", autofill: "off" } }
						defaultValue={ username }
						label={ "User" }
						onChange={ e => setUsername(e.target.value) }
						fullWidth
						error={ !usernameMatches && username.length > 0 }
					/>
					<TextField
						type={ "email" }
						defaultValue={ email }
						label={ "E-Mail Address" }
						onChange={ e => setEmail(e.target.value) }
						fullWidth
						error={ !emailMatches && email.length > 0 }
					/>
				</Stack>
				<Button
					variant={ "outlined" }
					onClick={ handleSave }
					fullWidth size={ "large" }
					disabled={ !firstNameMatches || !lastNameMatches || !usernameMatches || !emailMatches }
				> Save</Button>
				{ savedData && savedUser ?
					<Alert severity={ "success" }>Saved</Alert> : error.data ?
						<Alert severity={ "error" }>Error trying to save fist/ lastname: { error.data }</Alert> :
						error.user ?
							<Alert severity={ "error" }>Error trying to save email/
								username: { error.user }</Alert> : null }
			</Stack>
		</section>
	);
}