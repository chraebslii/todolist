import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Box, Button, Stack, Typography } from "@mui/material";
import CookieIcon from "@mui/icons-material/Cookie";

export const CookieDisclaimer = () => {
	const [cookies, setCookie, removeCookie] = useCookies(["cookiesAccepted"]);
	const [showDisclaimer, setShowDisclaimer] = React.useState(false);

	const acceptCookie = () => {
		setCookie("cookiesAccepted", true, { path: "/", maxAge: 60 * 60 * 24 * 7 });
		setShowDisclaimer(false);
	};

	useEffect(() => {
		!cookies.cookiesAccepted
			? setShowDisclaimer(true)
			: (setShowDisclaimer(false),
			  setCookie("cookiesAccepted", true, {
					path: "/",
					maxAge: 60 * 60 * 24 * 7,
			  }));
	}, [cookies]);

	return (
		<>
			<Box
				display={showDisclaimer ? "block" : "none"}
				className={"cookie-discalimer"}
				sx={{
					maxWidth: "20rem",
					zIndex: "1",
					padding: "1rem",
					position: "absolute",
					bottom: "1rem",
					left: "1rem",
					backgroundColor: "background.default",
					borderRadius: "1rem",
					border: ".2rem solid",
					borderColor: "primary.main",
				}}>
				<Stack spacing={1} direction={"column"}>
					<CookieIcon
						sx={{
							width: "3rem",
							height: "3rem",
						}}
					/>
					<Typography
						variant={"h6"}
						component={"span"}
						sx={{
							lineBreak: "auto",
						}}>
						This website uses cookies to enhance the user experience.
					</Typography>
					<Button variant={"contained"} color={"primary"} onClick={acceptCookie}>
						Accept
					</Button>
				</Stack>
			</Box>
		</>
	);
};
