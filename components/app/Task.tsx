import React from "react";
import { Box, Button, Checkbox, FormControlLabel, IconButton, Modal, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { TaskItem } from "@interfaces/index";

export default function Task({ id, title, checked }: TaskItem) {
	const [detailsOpened, setDetailsOpened] = React.useState(false);
	const handleOpen = () => setDetailsOpened(true);
	const handleClose = () => {
		tempValue.title = value.title;
		setDetailsOpened(false);
	};

	const [value, setValue] = React.useState({ title: title, checked: checked });
	const [tempValue, setTempValue] = React.useState({ title: title, checked: checked });
	const [seed, setSeed] = React.useState(1);
	const handleSave = () => {
		value.title = tempValue.title;
		setDetailsOpened(false);
		setSeed(Math.random());
	};

	return (
		<>
			<Stack spacing={1} direction={"row"} justifyContent={"space-between"} key={seed}>
				<Box sx={{ width: "100%" }}>
					<FormControlLabel
						className={"MuiFormControlLabel-fullwidth"}
						sx={{ width: "100%" }}
						control={
							<Checkbox
								defaultChecked={value.checked}
								onChange={e => setValue({ ...value, checked: e.target.checked })}
							/>
						}
						label={
							<TextField
								defaultValue={value.title}
								onChange={e => setValue({ ...value, title: e.target.value })}
								size={"small"}
								sx={{
									width: "100%",
								}}
							/>
						}
					/>
				</Box>
				<Box>
					<IconButton aria-label="edit item" color={"primary"} onClick={handleOpen}>
						<EditIcon />
					</IconButton>
				</Box>
			</Stack>
			<Modal
				open={detailsOpened}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						backgroundColor: "background.paper",
						minHeight: "200px",
						minWidth: "400px",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
					}}>
					<Stack spacing={2} direction={"column"}>
						<TextField
							defaultValue={value.title}
							onChange={e => setTempValue({ ...tempValue, title: e.target.value })}
							size={"small"}
							sx={{
								width: "100%",
							}}
						/>
						<Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
							<Button
								variant="outlined"
								size={"medium"}
								color="primary"
								fullWidth={true}
								onClick={handleClose}>
								cancel
							</Button>
							<Button
								variant="contained"
								size={"medium"}
								color="primary"
								fullWidth={true}
								endIcon={<SaveAsIcon />}
								onClick={handleSave}>
								save
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Modal>
		</>
	);
}
