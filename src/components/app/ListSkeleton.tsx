import React from "react";
import { Container, Skeleton, Stack } from "@mui/material";

export default class ListSkeleton extends React.Component {
	render() {
		return (
			<>
				{Array.from({ length: 2 }).map((_, index) => (
					<Container
						key={index}
						maxWidth={"md"}
						sx={{
							backgroundColor: "background.paper",
						}}>
						<Stack spacing={3} direction={"column"} sx={{ padding: "1rem 0" }}>
							<Stack
								direction={"row"}
								sx={{
									justifyContent: "space-between",
									alignItems: "center",
								}}>
								<Skeleton variant="text" sx={{ width: "50%", fontSize: "3rem" }} />
								<Skeleton variant="circular" width={50} height={50} />
							</Stack>

							<Stack spacing={-1} direction={"column"}>
								{Array.from({ length: 3 }).map((_, index) => (
									<Stack
										key={index}
										direction={"row"}
										sx={{
											justifyContent: "space-between",
											alignItems: "center",
										}}>
										<Stack
											spacing={3}
											direction={"row"}
											sx={{
												justifyContent: "space-between",
												alignItems: "center",
												width: "70%",
											}}>
											<Skeleton variant="circular" width={25} height={25} />
											<Skeleton variant="text" sx={{ width: "100%", fontSize: "2.5rem" }} />
										</Stack>
										<Skeleton variant="circular" width={40} height={40} />
									</Stack>
								))}
							</Stack>
						</Stack>
					</Container>
				))}
			</>
		);
	}
}
