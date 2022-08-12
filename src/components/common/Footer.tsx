import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const links = [
	{ href: "/imprint", label: "Impressum" },
	{ href: "/contact", label: "Kontakt" },
	{ href: "/privacy", label: "Datenschutz" },
];

export default class Footer extends React.Component {
	render() {
		return (
			<>
				<div className={"footer-space"}></div>
				<Box
					sx={{
						bottom: 0,
						position: "absolute",
						width: "100%",
						padding: "1rem 0",
						backgroundColor: "primary.main",
					}}>
					<footer>
						<nav>
							<Stack
								direction={"column"}
								className={"text-center"}
								sx={{
									textAlign: "center",
									color: "text.secondary",
								}}>
								<Stack
									gap={2}
									direction={"row"}
									className={"d-flex justify-content-center"}
									sx={{
										display: "flex",
										justifyContent: "center",
									}}>
									{links.map((link, index) => (
										<>
											<Typography
												component={"a"}
												href={link.href}
												sx={{
													color: "text.secondary",
												}}>
												{link.label}
											</Typography>
											{index < links.length - 1 && <span>|</span>}
										</>
									))}
								</Stack>
								<span className={"text-sec copyright"}>
									&copy; {new Date().getFullYear()} chraebsli IT-Services
								</span>
							</Stack>
						</nav>
					</footer>
				</Box>
			</>
		);
	}
}
