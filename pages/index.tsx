import React from "react";
import Layout from "./_app";

export default class Index extends React.Component {
	render() {
		return (
			<>
				<Layout title={"Index"}>
					<main>
						<h1>Hello World</h1>
					</main>
				</Layout>
			</>
		);
	}
}
