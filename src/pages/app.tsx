import { useEffect, useState } from "react";
import Page from "@components/common/Page";
import { NoSsr, Stack } from "@mui/material";
import List from "../components/app/List";
import ListSkeleton from "../components/app/ListSkeleton";
import { TaskList, User } from "@interfaces/entitys";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";

const getUser = async (token: string): Promise<User> => {
	const session = await axios.post(`${ process.env.API_URL }/session/verify`, { token }).then(res => res.data);
	return await axios.get(`${ process.env.API_URL }/user/${ session.id }`).then(res => res.data);
};

const getLists = async (userId: string): Promise<TaskList[]> =>
	axios.get(`${ process.env.API_URL }/list/user/${ userId }`).then(res => res.data);

export default function App() {
	const router = useRouter();
	const [ data, setData ] = useState<TaskList[]>();
	const [ isLoading, setLoading ] = useState(false);
	const [ user, setUser ] = useState<User>();

	const [ cookies ] = useCookies([ "session" ]);
	const authToken = cookies.session;

	useEffect(() => {
		getUser(authToken).then(user => {
			setLoading(true);
			setUser(user);
			getLists(user.id).then(lists => {
				setData(lists);
				setLoading(false);
			});
		});
	}, [ authToken ]);

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
						data && data.map(list => <List key={ list.id } listItem={ list } />)
					) }
				</Stack>
			</Page>
		</NoSsr>
	) : null;
}
