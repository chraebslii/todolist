import React, { useState } from "react";
import { Container, Divider, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TaskItem, TaskList } from "@interfaces/entitys";
import Task from "./Task";

const generateIdIfNoId = (id: string | undefined): string =>
	id ? id : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export default function List({ listItem }: { listItem: TaskList }) {
	const [ list, setList ] = useState<TaskList>(listItem);
	const [ tasks, setTasks ] = useState<TaskItem[]>(listItem.tasks);

	const handleNewTask = () => {
		setTasks([ ...tasks, { name: "", description: "", checked: false, listId: list.id } ]);
	};

	return (
		<>
			<Container
				maxWidth={ "md" }
				sx={ {
					backgroundColor: "background.paper",
				} }>
				<Stack spacing={ 3 } direction={ "column" } sx={ { padding: "1rem 0" } }>
					<section>
						<Stack
							direction={ "row" }
							spacing={ 5 }
							sx={ {
								justifyContent: "space-between",
								alignItems: "center",
							} }>
							<Typography variant={ "h5" }>{ list.name }</Typography>
							<IconButton aria-label="add item" color={ "primary" } onClick={ handleNewTask }>
								<AddIcon />
							</IconButton>
						</Stack>
						<Divider />
					</section>

					<section>
						<Stack spacing={ 3 } direction={ "column" }>
							{ tasks &&
								tasks.map(task => {
									if (!task.checked) {
										return <Task key={ generateIdIfNoId(task.id) } taskItem={ task } />;
									}
								}) }
						</Stack>
					</section>

					<section>
						<details>
							<summary className={ "no-marker" }>
								<Divider>show done items</Divider>
							</summary>
							<Stack spacing={ 3 } direction={ "column" }>
								{ tasks &&
									tasks.map(task => {
										if (task.checked) {
											return <Task key={ generateIdIfNoId(task.id) } taskItem={ task } />;
										}
									}) }
							</Stack>
						</details>
					</section>
				</Stack>
			</Container>
		</>
	);
}
