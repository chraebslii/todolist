import React, { useState } from "react";
import { Container, Divider, IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TaskList } from "@interfaces/entitys";
import Task from "./Task";

export default function List({ id, name, description, tasks }: TaskList) {
	const [ allTasks, setAllTasks ] = useState(tasks);

	const handleNewTask = () => {
		setAllTasks([ ...allTasks, { name: "", description: "", checked: false } ]);
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
							<Typography variant={ "h5" }>{ name }</Typography>
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
										return <Task key={ task.id } taskItem={ task } />;
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
											return <Task key={ task.id } taskItem={ task } />;
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
