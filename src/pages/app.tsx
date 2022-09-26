import { useEffect, useState } from "react";
import { Box, Container, NoSsr, Stack } from "@mui/material";
import Layout from "@components/Layout";
import List from "../components/app/List";
import ListSkeleton from "../components/app/ListSkeleton";
import { TaskList } from "@interfaces/entitys";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function App(){
	const [ data, setData ] = useState<TaskList[] | null>(null);
	const [ isLoading, setLoading ] = useState(false);

	const [ cookies ] = useCookies([ "token", "user" ]);
	const authToken = cookies.token;
	const userID = cookies.user;

	const router = useRouter();
	useEffect(() => {
		if (authToken && userID) {
			setLoading(true);
			fetch(`${ process.env.API_URL }/list/user/${ userID }`)
				.then(res => res.json())
				.then(data => {
					setData(data);
					setLoading(false);
				});
		}
	}, [ userID ]);

	useEffect(() => {
		!authToken && router.push(`/auth?source=${ router.pathname }`);
	}, [ authToken, router ]);
	return authToken ? (
		<NoSsr>
			<Layout title={ "App" }>
				<Box>
					<main>
						<Container sx={ { padding: "2rem 0" } }>
							<Stack spacing={ 5 } direction={ "column" } alignItems={ "center" }>
								{ isLoading ? (
									<ListSkeleton />
								) : (
									data && data.map(list => <List key={ list.id } { ...list } />)
								) }
							</Stack>
						</Container>
					</main>
				</Box>
			</Layout>
		</NoSsr>
	) : null;
}
