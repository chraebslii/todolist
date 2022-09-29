import React from "react";
import { Box, Button, Checkbox, FormControlLabel, IconButton, Modal, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { TaskItem } from "@interfaces/entitys";
import axios from "axios";

const saveNewTask = async (task: TaskItem) => {
	try {
		return await axios.post(`${ process.env.API_URL }/task`, task).then(res => res.data);
	} catch (e) {
		throw new Error(e);
	}
};

const updateTask = async (task: TaskItem) => {
	try {
		return await axios.put(`${ process.env.API_URL }/task/${ task.id }`, task).then(res => res.data);
	} catch (e) {
		throw new Error(e);
	}
};

export default function Task({ taskItem }: { taskItem: TaskItem }) {
	const [ detailsOpened, setDetailsOpened ] = React.useState(false);
	const handleOpen = () => setDetailsOpened(true);
	const handleClose = () => {
		setTempTask(task);
		setDetailsOpened(false);
	};

	const [ task, setTask ] = React.useState(taskItem);
	const [ tempTask, setTempTask ] = React.useState(taskItem);
	const [ seed, setSeed ] = React.useState(1);

	const handleSave = () => {
		setTask({ ...task, name: tempTask.name });
		setTask((newTask) => {
			if (newTask.id) {
				updateTask(newTask).then(updateTask => {setTask(updateTask);});
			} else {
				saveNewTask(newTask).then(newTask => {setTask(newTask);});
			}
			return newTask;
		});
		setDetailsOpened(false);
		setSeed(Math.random());
	};

	return (
		<>
			<Stack spacing={ 1 } direction={ "row" } justifyContent={ "space-between" } key={ seed }>
				<Box sx={ { width: "100%" } }>
					<FormControlLabel
						className={ "MuiFormControlLabel-fullwidth" }
						sx={ { width: "100%" } }
						control={
							<Checkbox
								checked={ task.checked }
								onChange={ e => setTask({ ...task, checked: e.target.checked }) }
							/>
						}
						label={
							<TextField
								defaultValue={ task.name }
								onChange={ e => setTask({ ...task, name: e.target.value }) }
								size={ "small" }
								sx={ { width: "100%" } }
							/>
						}
					/>
				</Box>
				<Box>
					<IconButton aria-label="edit item" color={ "primary" } onClick={ handleOpen }>
						<EditIcon />
					</IconButton>
				</Box>
			</Stack>
			<Modal
				open={ detailsOpened }
				onClose={ handleClose }
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box
					sx={ {
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
					} }>
					<Stack spacing={ 2 } direction={ "column" }>
						<TextField
							defaultValue={ task.name }
							onChange={ e => setTempTask({ ...tempTask, name: e.target.value }) }
							size={ "small" }
							sx={ {
								width: "100%",
							} }
						/>
						<Stack spacing={ 2 } direction={ { xs: "column", sm: "row" } }>
							<Button
								variant="outlined"
								size={ "medium" }
								color="primary"
								fullWidth={ true }
								onClick={ handleClose }>
								cancel
							</Button>
							<Button
								variant="contained"
								size={ "medium" }
								color="primary"
								fullWidth={ true }
								endIcon={ <SaveAsIcon /> }
								onClick={ handleSave }>
								save
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Modal>
		</>
	);
}
