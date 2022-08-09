import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import { AppBar, Avatar, Box, Button, Container, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";

const pages = [
	{ href: "/app", label: "App" },
	{
		href: "/settings",
		label: "Settings",
	},
];
const settings = [
	{ href: "/profile", label: "Profile" },
	{ href: "/logout", label: "Logout" },
];

const Header = () => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{BrandLogo(true)}

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit">
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}>
							{pages.map(page => (
								<MenuItem key={page.label} onClick={handleCloseNavMenu}>
									<Typography
										textAlign="center"
										component={"a"}
										sx={{ color: "text.primary", textDecoration: "none" }}
										variant={"button"}
										href={page.href}>
										{page.label}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>

					{BrandLogo(false)}

					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map(page => (
							<Button
								key={page.label}
								href={page.href}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block", textAlign: "center" }}>
								{page.label}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Account" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							{settings.map(setting => (
								<MenuItem key={setting.label} onClick={handleCloseUserMenu}>
									<Typography
										textAlign="center"
										component={"a"}
										sx={{ color: "text.primary", textDecoration: "none" }}
										variant={"button"}
										href={setting.href}>
										{setting.label}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

const BrandLogo = (desktop: boolean) => {
	return (
		<Typography
			component={"a"}
			href={"/"}
			className={"navbar-brand"}
			sx={{
				display: desktop ? { xs: "none", md: "flex" } : { xs: "flex", md: "none" },
				width: { xs: "50%", md: "auto" },
				color: "white",
				textDecoration: "none",
			}}>
			<img
				src={"/assets/logo/logo-white-transparent.svg"}
				alt={"logo"}
				width={50}
				height={50}
				className={"d-inline-block align-center"}
			/>
			<Typography
				className={"brand-name"}
				component={"span"}
				variant={"h6"}
				sx={{
					margin: "0 1rem",
					justifySelf: "center",
					alignSelf: "center",
				}}>
				Todolist
			</Typography>
		</Typography>
	);
};

export default Header;
