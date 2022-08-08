import React, { ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import Meta from "../components/common/Meta";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

// assets and css
import "../css/index.sass";

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

const theme = createTheme({
	palette: {
		primary: { main: "#507cff" },
		text: {
			primary: "#000000",
			secondary: "#ffffff",
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
				<ThemeProvider theme={theme}>
					<Meta title={this.props.title} />
					<Header />
					{this.props.children}
					<Footer />
				</ThemeProvider>
			</>
		);
	}
}
