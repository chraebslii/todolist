import { useEffect, useState } from "react";
import Page from "@components/common/Page";
import { NoSsr, Stack } from "@mui/material";
import List from "../components/app/List";
import ListSkeleton from "../components/app/ListSkeleton";
import { TaskList } from "@interfaces/entitys";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function App() {
	const [ data, setData ] = useState<TaskList[] | null>(null);
	const [ isLoading, setLoading ] = useState(false);

	const [ cookies ] = useCookies([ "session", "user" ]);
	const authToken = cookies.session;
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
			<Page name={ "App" }>
				<Stack spacing={ 5 } direction={ "column" } alignItems={ "center" }>
					{ isLoading ? (
						<ListSkeleton />
					) : (
						data && data.map(list => <List key={ list.id } { ...list } />)
					) }
				</Stack>
			</Page>
		</NoSsr>
	) : null;
}
