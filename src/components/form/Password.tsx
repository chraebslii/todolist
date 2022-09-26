import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";

export default function Password({
	password, setPassword, label, error = false, fullWidth = true,
}: { password: string, setPassword: React.Dispatch<React.SetStateAction<string>>, label: string, error?: boolean, fullWidth?: boolean }) {
	const [ showPassword, setShowPassword ] = React.useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

	return (
		<FormControl variant="outlined" fullWidth={ fullWidth }>
			<InputLabel htmlFor="outlined-adornment-password">{ label }</InputLabel>
			<OutlinedInput
				type={ showPassword ? "text" : "password" }
				value={ password }
				onChange={ e => setPassword(e.target.value) }
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={ handleClickShowPassword }
							onMouseDown={ handleMouseDownPassword }
							edge="end"
						>
							{ showPassword ? <VisibilityOff /> : <Visibility /> }
						</IconButton>
					</InputAdornment>
				}
				label={ label }
				error={ error }

			/>
		</FormControl>

	);
}