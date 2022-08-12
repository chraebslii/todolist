import { Box, Button, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";

export const LoginTab = () => {
	return (
		<>
			<section>
				<form action={""}>
					<Stack direction={"column"} spacing={1}>
						<Stack direction={"row"}>
							<TextField type={"email"} name={"email"} id={"email"} label={"E-Mail"} fullWidth={true} />
						</Stack>
						<Stack direction={"row"}>
							<TextField
								type={"password"}
								name={"password"}
								id={"password"}
								label={"Password"}
								fullWidth={true}
							/>
						</Stack>
						<Stack direction={"row"} spacing={3}>
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
								endIcon={<LoginIcon />}
								fullWidth={true}>
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