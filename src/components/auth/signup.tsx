import { Box, Button, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export const SignupTab = () => {
	return (
		<>
			<section>
				<form action={""}>
					<Stack direction={"column"} spacing={1}>
						<Stack direction={"row"}>
							<TextField name={"username"} id={"username"} label={"Username"} fullWidth={true} />
						</Stack>
						<Stack direction={"row"}>
							<TextField type={"email"} name={"email"} id={"email"} label={"E-Mail"} fullWidth={true} />
						</Stack>
						<Stack direction={"row"} spacing={1}>
							<TextField
								type={"password"}
								name={"password"}
								id={"password"}
								label={"Password"}
								fullWidth={true}
							/>
							<TextField
								type={"password"}
								name={"repeat-password"}
								id={"repeat-password"}
								label={"repeat Password"}
								fullWidth={true}
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
								fullWidth={true}>
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