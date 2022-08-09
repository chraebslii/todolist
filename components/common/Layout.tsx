import React, { ReactNode } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Meta from "./Meta";
import Header from "./Header";
import Footer from "./Footer";

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
		text: {
			primary: "#000000",
			secondary: "#ffffff",
		},
		background: {
			default: "#ffffff",
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
				</ThemeProvider>
			</>
		);
	}
}
