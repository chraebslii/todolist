import { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import Layout from "@components/Layout";
import List from "../components/app/List";
import ListSkeleton from "../components/app/ListSkeleton";
import { TaskList } from "@interfaces/index";
import Auth from "@pages/auth";

export default function App() {
	const [data, setData] = useState<TaskList[] | null>(null);
	const [isLoading, setLoading] = useState(false);

	const [token, setToken] = useState();
	if (!token) {
		return <Auth setToken={setToken} />;
	}

	console.log(token);

	useEffect(() => {
		const userID = 1;
		setLoading(true);
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
