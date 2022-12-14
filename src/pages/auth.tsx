import React, { useEffect } from "react";
import Page from "@components/common/Page";
import { Box, Tab, Tabs } from "@mui/material";
import { LoginTab } from "@components/auth/login";
import { SignupTab } from "@components/auth/signup";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { User } from "@interfaces/entitys";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

enum TabIndex {
	login = 0,
	signup = 1,
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<Box
			role="tabpanel"
			hidden={ value !== index }
			id={ `simple-tabpanel-${ index }` }
			aria-labelledby={ `simple-tab-${ index }` }
			{ ...other }>
			{ value === index && <Box sx={ { p: 3 } }>{ children }</Box> }
		</Box>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${ index }`,
		"aria-controls": `simple-tabpanel-${ index }`,
	};
}

export default function Auth() {
	const [ value, setValue ] = React.useState(0);
	const router = useRouter();
	const { tab } = router.query as { tab: "login" | "signup" };
	const [ , setCookie ] = useCookies([ "session", "user" ]);

	const setToken = (token: string) => setCookie("session", token, { path: "/" });
	const setUser = (user: User) => setCookie("user", user, { path: "/" });

	useEffect(() => {
		tab ? setValue(TabIndex[tab]) : setValue(TabIndex.login);
	}, [ router ]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);
	const redirect = () => router.push("/app");

	return (
		<Page name={ "Login" } sx={ { padding: "5rem 0", display: "flex", justifyContent: "center" } }>
			<Box
				sx={ {
					width: "50%",
				} }>
				<Box sx={ { width: "100%" } }>
					<Box sx={ { borderBottom: 1, borderColor: "divider" } }>
						<Tabs
							value={ value }
							onChange={ handleChange }
							aria-label="basic tabs example"
							variant={ "fullWidth" }>
							<Tab label="Login" { ...a11yProps(0) } />
							<Tab label="Sign up" { ...a11yProps(1) } />
						</Tabs>
					</Box>
					<TabPanel value={ value } index={ 0 }>
						<LoginTab setToken={ setToken } setUser={ setUser } redirect={ redirect } />
					</TabPanel>
					<TabPanel value={ value } index={ 1 }>
						<SignupTab setToken={ setToken } setUser={ setUser } redirect={ redirect } />
					</TabPanel>
				</Box>
			</Box>
		</Page>
	);
}
