import React from "react";
import { Box, Checkbox, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default class Task extends React.Component<{
	title?: string;
	checked?: boolean;
}> {
	render() {
		return (
			<>
				<Stack spacing={1} direction={"row"} justifyContent={"space-between"}>
					<Box sx={{ width: "100%" }}>
						<FormControlLabel
							className={"MuiFormControlLabel-fullwidth"}
							sx={{ width: "100%" }}
							control={<Checkbox defaultChecked={this.props.checked} />}
							label={
								<TextField
									value={this.props.title}
									size={"small"}
									sx={{
										width: "100%",
									}}
								/>
							}
						/>
					</Box>
					<Box>
						<IconButton aria-label="edit item" color={"primary"}>
							<EditIcon />
						</IconButton>
					</Box>
				</Stack>
			</>
		);
	}
}
