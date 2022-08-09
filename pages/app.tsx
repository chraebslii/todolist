import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Layout from "@components/common/Layout";
import List from "@components/app/List";
import ListSkeleton from "@components/app/ListSkeleton";

export default function App() {
	const [data, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetch("http://localhost:3000/api/tasklists")
			.then(res => res.json())
			.then(data => {
				setData(data);
				setLoading(false);
			});
	}, []);

	return (
		<>
			<Layout title={"App"}>
				<Box>
					<main>
						<Container sx={{ padding: "2rem 0" }}>
							<Stack spacing={5} direction={"column"} alignItems={"center"}>
								{isLoading ? (
									<ListSkeleton />
								) : (
									data && data.map(list => <List key={list.id} {...list} />)
								)}
							</Stack>
						</Container>
					</main>
				</Box>
			</Layout>
		</>
	);
}
