import React from "react";
import { Box, Button, Checkbox, FormControlLabel, IconButton, Modal, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { TaskItem } from "@interfaces/entitys";
import axios from "axios";
import { debounce } from "lodash";

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

export default function Task({
	taskItem, handleTaskChange,
}: { taskItem: TaskItem, handleTaskChange: (task: TaskItem) => void }) {
	const [ detailsOpened, setDetailsOpened ] = React.useState<boolean>(false);
	const handleOpen = () => setDetailsOpened(true);
	const handleClose = () => {
		setTempTask(task);
		setDetailsOpened(false);
	};

	const [ task, setTask ] = React.useState<TaskItem>(taskItem);
	const [ tempTask, setTempTask ] = React.useState<TaskItem>(taskItem);
	const [ seed, setSeed ] = React.useState<number>(1);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => updateDebouncedName(e.target.value);
	const updateDebouncedName = debounce((name: string) => {
		setTask({ ...task, name: name });
		if (task.id) {
			updateTask({ ...task, name: name }).then(updatedTask => setTask(updatedTask));
		} else {
			saveNewTask({ ...task, name: name }).then(savedTask => setTask(savedTask));
		}
		setSeed(Math.random());
	}, 1000);

	const handleSave = () => {
		setTask({ ...task, ...tempTask });
		setTask(newTask => {
			if (newTask.id) {
				updateTask(newTask).then(updatedTask => setTask(updatedTask));
			} else {
				saveNewTask(newTask).then(createdTask => setTask(createdTask));
			}
			return newTask;
		});
		setDetailsOpened(false);
		setSeed(Math.random());
	};

	const handleCheck = () => {
		setTask({ ...task, checked: !task.checked });
		setTask(task => {
			updateTask(task).then(updatedTask => setTask(updatedTask));
			handleTaskChange(task);
			return task;
		});
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
								defaultChecked={ task.checked }
								//checked={ task.checked }
								onChange={ handleCheck }
							/>
						}
						label={
							<TextField
								defaultValue={ task.name }
								onChange={ handleChange }
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
