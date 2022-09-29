import React from "react";
import { Box, Button, Checkbox, FormControlLabel, IconButton, Modal, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { TaskItem } from "@interfaces/entitys";
import { ResponseError } from "@interfaces/error";
import { SetState } from "@interfaces/react";
import axios from "axios";
import { debounce } from "lodash";

const requestHandler = (method: "POST" | "PUT", path: string, body: TaskItem, setError: SetState<ResponseError>) => {
	return axios
		.request({ method, url: `${ process.env.API_URL }${ path }`, data: body })
		.then((res) => res.data as TaskItem)
		.catch((err) => {
			setError({ message: err.message, code: err.code });
			throw err as ResponseError;
		});
};

const saveOrUpdateTask = async (task: TaskItem, setError: SetState<ResponseError>): Promise<TaskItem> => {
	if (!task.id) {
		return requestHandler("POST", "/task", task, setError);
	} else {
		return requestHandler("PUT", `/task/${ task.id }`, task, setError);
	}
};

export default function Task(
	{ taskItem, handleTaskChange }: { taskItem: TaskItem, handleTaskChange: (task: TaskItem) => void }) {
	const [ detailsOpened, setDetailsOpened ] = React.useState<boolean>(false);
	const [ task, setTask ] = React.useState<TaskItem>(taskItem);
	const [ tempTask, setTempTask ] = React.useState<TaskItem>(taskItem);
	const [ seed, setSeed ] = React.useState<number>(1);
	const [ error, setError ] = React.useState<ResponseError>();

	const handleRequest = (task: TaskItem, taskChange?: boolean) => {
		saveOrUpdateTask(task, setError).then(task => {
			if (task) {
				setTask(task);
				setSeed(Math.random());
				taskChange && handleTaskChange(task);
			}
		});
	};

	const handleOpen = () => setDetailsOpened(true);
	const handleClose = () => {
		setTempTask(task);
		setDetailsOpened(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => updateDebouncedName(e.target.value);
	const updateDebouncedName = debounce((name: string) => {
		setTask({ ...task, name: name });
		handleRequest({ ...task, name: name });
	}, 1000);

	const handleSave = () => {
		setTask({ ...task, ...tempTask });
		handleRequest({ ...task, ...tempTask });
		setDetailsOpened(false);
	};

	const handleCheck = () => {
		setTask({ ...task, checked: !task.checked });
		handleRequest({ ...task, checked: !task.checked }, true);
	};

	if (error) {
		alert(error.message);
		setError(undefined);
	}

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
