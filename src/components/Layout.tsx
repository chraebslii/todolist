import React, { ReactNode } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Meta from "./common/Meta";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { CookieDisclaimer } from "@components/common/CookieDisclaimer";

//declare module "@mui/material/styles" {
//	interface Theme {
//		palette: {
//			primary: { main: string };
//			secondary: { main: string };
//		};
//	}
//
//	// allow configuration using `createTheme`
//	interface ThemeOptions {
//		palette: {
//			primary: { main: string };
//			secondary: { main: string };
//		};
//	}
//}

const defaultTheme = createTheme({
	palette: {
		primary: { main: "#507cff" },
		secondary: { main: "#ffffff" },
		text: {
			primary: "#000000",
			secondary: "#ffffff",
			//secondary: "#000000",
		},
		background: {
			default: "#ffffff",
			paper: "#dcdcdc",
		},
	},
});

export default class Layout extends React.Component<{
	children?: ReactNode;
	title?: string;
}> {
	render() {
		return (
			<>
				<ThemeProvider theme={defaultTheme}>
					<CssBaseline />
					<Meta title={this.props.title} />
					<Header />
					{this.props.children}
					<Footer />
					<CookieDisclaimer />
				</ThemeProvider>
			</>
		);
	}
}
