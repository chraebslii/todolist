import React from "react";
import Head from "next/head";

export default class Meta extends React.Component<{
	title?: string;
}> {
	render() {
		return (
			<>
				<Head>
					<title> {this.props.title} </title>
					<meta charSet="utf-8" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
			</>
		);
	}
}
