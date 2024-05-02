
import { ChangeEvent, MouseEvent } from "react";
import { useSortable } from "@dnd-kit/sortable";

//components
import { EditableSpan } from "../components/EditableSpan";

//components/mui
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from '@mui/icons-material/Delete';


//styles
import { getListItemSX } from "./TodoList.styles"
import { CSS } from '@dnd-kit/utilities';
import s from './TodoListItem.module.css';


type TodoListItemPropsType = {
	id: string
	title: string
	isCompleted: boolean
	onTaskStatusChange: (event: ChangeEvent<HTMLInputElement>, taskId: string) => void
	onUpdateTaskTitle: (taskId: string, title: string) => void
	onRemoveTask: (event: MouseEvent<HTMLButtonElement>, taskId: string) => void
}

export const TodoListItem = (props: TodoListItemPropsType) => {
	const {
		id,
		title,
		isCompleted,
		onTaskStatusChange,
		onUpdateTaskTitle,
		onRemoveTask
	} = props;

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const styles = {
		transform: CSS.Transform.toString(transform),
		transition,
	};


	return (
		<ListItem
			key={id}
			ref={setNodeRef}
			{...attributes}
			style={styles}
			sx={getListItemSX(isCompleted)}
		>
			<div className={s.content}>
				<Checkbox checked={isCompleted} onChange={(event) => onTaskStatusChange(event, id)} />
				<EditableSpan title={title} onChange={(title) => onUpdateTaskTitle(id, title)} />
			</div>
			<button
				className={s.dragHandle}
				{...listeners}
				title="Drag n Drop"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={s.icon}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
					/>
				</svg>
			</button>
			<IconButton onClick={(event) => onRemoveTask(event, id)}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	)
}