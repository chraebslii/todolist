import React from "react";
import Layout from "@components/Layout";
import { Box, Container, SxProps, Theme } from "@mui/material";

export default function Page({ name, sx, children }: { name: string, sx?: SxProps<Theme>, children: React.ReactNode }) {
	return (
		<Layout title={ name }>
			<Box>
				<main>
					<Container sx={ !sx ? { padding: "2rem 0" } : sx }>
						{ children }
					</Container>
				</main>
			</Box>
		</Layout>
	);
}