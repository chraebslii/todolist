import React from "react";
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	Modal,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskItem } from "@interfaces/entitys";
import { ResponseError } from "@interfaces/error";
import { SetState } from "@interfaces/react";
import { debounce } from "lodash";
import { requestHandler } from "@utils/request-handler";

const saveOrUpdateTask = async (task: TaskItem, setError: SetState<ResponseError>): Promise<TaskItem> => {
	if (!task.id) {
		return requestHandler<TaskItem>("POST", "/task", task, setError);
	} else {
		return requestHandler<TaskItem>("PUT", `/task/${ task.id }`, task, setError);
	}
};

export default function Task({
	taskItem, handleTaskChange,
}: { taskItem: TaskItem, handleTaskChange: (task: TaskItem, deleted?: boolean) => void }) {
	const [ detailsOpened, setDetailsOpened ] = React.useState<boolean>(false);
	const [ task, setTask ] = React.useState<TaskItem>(taskItem);
	const [ tempTask, setTempTask ] = React.useState<TaskItem>(taskItem);
	const [ seed, setSeed ] = React.useState<number>(1);
	const [ error, setError ] = React.useState<ResponseError>();
	const [ deleted, setDeleted ] = React.useState<boolean>(false);

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

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this task?")) {
			requestHandler("DELETE", `/task/${ task.id }`, undefined, setError).then(() => {
				setDetailsOpened(false);
				setDeleted(true);
				handleTaskChange({ ...task }, true);
			});
		}
	};

	if (error) {
		alert(error.message);
		setError(undefined);
	}

	return !deleted && (
		<>
			<Stack spacing={ 1 } direction={ "row" } justifyContent={ "space-between" } key={ seed }>
				<Box sx={ { width: "100%" } }>
					<FormControlLabel
						className={ "MuiFormControlLabel-fullwidth" }
						sx={ { width: "100%" } }
						control={
							<Checkbox
								checked={ task.checked }
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
							defaultValue={ tempTask.name }
							onChange={ e => setTempTask({ ...tempTask, name: e.target.value }) }
							size={ "small" }
							fullWidth
							label={ "Title" }
						/>
						<TextField
							defaultValue={ tempTask.description }
							onChange={ e => setTempTask({ ...tempTask, description: e.target.value }) }
							size={ "small" }
							fullWidth
							label={ "Description" }
							multiline
						/>
						<Stack direction={ "row" } sx={ { alignItems: "center", justifyContent: "flex-start" } }>
							<Typography> Checked: </Typography>
							<Checkbox
								checked={ tempTask.checked }
								onChange={ e => setTempTask({ ...tempTask, checked: e.target.checked }) }
							/>
						</Stack>
						<Stack spacing={ 2 } direction={ { xs: "column", sm: "row" } }>
							<IconButton aria-label="delete" color={ "error" } onClick={ handleDelete }>
								<DeleteIcon />
							</IconButton>
							<Button
								variant={ "outlined" }
								fullWidth
								endIcon={ <CancelIcon /> }
								onClick={ handleClose }>
								cancel
							</Button>
							<Button
								variant={ "contained" }
								fullWidth
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
