import * as React from "react";
import { useEffect, useState } from "react";
import Page from "@components/common/Page";
import { Avatar, Container, NoSsr, Stack, Typography } from "@mui/material";
import { Session, User, UserData } from "@interfaces/entitys";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "axios";
import SetUserInfo from "@components/profile/SetUserInfo";
import SetPassword from "@components/profile/SetPassword";

const getUser = async (token: string): Promise<User> => {
	const session: Session = await axios.post(`${ process.env.API_URL }/session/verify`, { token }).then(res => res.data);
	return await axios.get(`${ process.env.API_URL }/user/${ session.id }`).then(res => res.data);
};

const getSessions = async (userId: string): Promise<Session[]> =>
	await axios.get(`${ process.env.API_URL }/session/user/${ userId }`).then(res => res.data);

const getUserData = async (userId: string): Promise<UserData> =>
	await axios.get(`${ process.env.API_URL }/userdata/user/${ userId }`).then(res => res.data);

export default function Profile() {
	const router = useRouter();
	const [ user, setUser ] = useState<User>();
	const [ userData, setUserData ] = useState<UserData>();
	const [ sessions, setSessions ] = useState<Session[]>([]);

	const [ cookies ] = useCookies([ "session" ]);
	const authToken = cookies.session;

	useEffect(() => {
		getUser(authToken).then(user => {
			setUser(user);
			getSessions(user.id).then(sessions => setSessions(sessions));
			getUserData(user.id).then(userData => setUserData(userData));
		});
	}, [ authToken ]);

	useEffect(() => {
		!authToken && router.push(`/auth?source=${ router.pathname }`);
	}, [ authToken, router ]);

	return authToken && user && userData ? (
		<NoSsr>
			<Page name={ "Profile" }>
				<Container maxWidth={ "md" }>
					<Stack spacing={ 2 } direction={ "column" }>
						<section>
							<Avatar alt="Account" src={ `${ process.env.API_URL }/userdata/image/${ user.id }` } />
						</section>
						<Stack spacing={ 5 } direction={ "column" }>
							<SetUserInfo userData={ userData } user={ user } />
							<SetPassword user={ user } />
						</Stack>
						<section>
							<Typography variant={ "h4" }>Sessions:</Typography>
							<Stack spacing={ 0 } direction={ "column" }>
								{ sessions.map((session, id) => (
									<Typography variant={ "h6" } key={ id }>
										{ `${ session.createdAt }` }
									</Typography>
								)) }
							</Stack>
						</section>
					</Stack>
				</Container>
			</Page>
		</NoSsr>
	) : null;
}
