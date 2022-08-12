import { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Layout from "@components/Layout";
import List from "../components/app/List";
import ListSkeleton from "../components/app/ListSkeleton";
import { TaskList } from "@interfaces/index";

export default function App() {
	const [data, setData] = useState<TaskList[] | null>(null);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const userID = 1;
		setLoading(true);
		//fetch("http://localhost:3001/api/list/user/1")
		fetch(`${process.env.API_URL}/list/user/${userID}`)
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
