
import { ChangeEvent, MouseEvent } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core';
import {
	arrayMove,
	sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from "@dnd-kit/modifiers";

//components
import { AddItemForm } from "../components/AddItemForm";
import { SortableWrapper } from "./SortableWrapper";
import { EditableSpan } from "../components/EditableSpan";
import { TodoListItem } from "./TodoListItem";


//components mui
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box';
import { StatusButton } from "../elements/material/StatusButton";

//css 
import s from './TodoList.module.css';
import { statusButtonsGroupSX } from "./TodoList.styles";

//types
import { tasksFilterValuesType, TodoListTasksType, TodoListType } from "./TodoListContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../model/store";
import { addTaskAction, changeTaskStatusAction, changeTaskTitleAction, removeTaskAction } from "../model/tasks-actions";
import { addTodoListAction, changeTodoListStatus, removeTodoListAction } from "../model/todolists-actions";

export type TaskType = {
	id: string
	title: string
	isCompleted: boolean
}

type TodoListPropsType = {
	todoList: TodoListType
	// title: string
	// todoListID: string
	// tasksFilter: tasksFilterValuesType
	// tasks: Array<TaskType>
	// addTask: (todoListID: string, title: string) => void
	// updateTaskTitle: (todoListID: string, taskId: string, title: string) => void
	// updateTodoListTitle: (todoListID: string, title: string) => void
	// removeTodoList: (todoListID: string) => void
	// removeTask: (todoListID: string, taskId: string) => void
	// changeStatus: (todoListID: string, filter: tasksFilterValuesType) => void
	// changeTaskStatus: (todoListID: string, id: string, isCompleted: boolean) => void
	// handleDragEndTask: (todoListID: string, newTasks: Array<TaskType>) => void
}

export const TodoList = ({ todoList }: TodoListPropsType) => {

	const { id, status, title } = todoList;

	// const {
	// 	title,
	// 	tasks,
	// 	todoListID,
	// 	addTask,
	// 	updateTaskTitle,
	// 	updateTodoListTitle,
	// 	removeTask,
	// 	removeTodoList,
	// 	tasksFilter,
	// 	changeStatus,
	// 	changeTaskStatus,
	// 	handleDragEndTask
	// } = props;

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	// let todoList = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists.filter(list => list.id === todoListID));

	let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id]);

	let dispatch = useDispatch();

	const getTodoListTasks = () => {

		if (status === 'active') {
			return tasks.filter(task => !task.isCompleted);
		}

		if (status === 'completed') {
			return tasks.filter(task => task.isCompleted);
		}

		return tasks;
	}

	const filteredTodoListTasks = getTodoListTasks();

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = filteredTodoListTasks.findIndex((task) => task.id === active.id);
			const newIndex = filteredTodoListTasks.findIndex((task) => task.id === over?.id);
			const newTasks = arrayMove(filteredTodoListTasks, oldIndex, newIndex);
			// handleDragEndTask(todoListID, newTasks);
		}
	};

	const handleRemoveTask = (event: MouseEvent<HTMLButtonElement>, taskId: string) => {
		event.stopPropagation();
		dispatch(removeTaskAction(id, taskId));
		// removeTask(todoListID, taskId);
	}

	const handleTaskStatusChange = (event: ChangeEvent<HTMLInputElement>, taskId: string) => {
		event.stopPropagation();
		const { checked } = event.currentTarget;
		dispatch(changeTaskStatusAction(taskId, checked, id));
		// changeTaskStatus(todoListID, taskId, checked);
	}

	const handleUpdateTaskTitle = (taskId: string, title: string) => {
		dispatch(changeTaskTitleAction(id, taskId, title));
		// updateTaskTitle(todoListID, taskId, title);
	}

	const tasksList: JSX.Element = filteredTodoListTasks.length === 0
		? <span>Tasks list is empty</span>
		:
		<DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToParentElement]} onDragEnd={handleDragEnd}>
			<SortableWrapper items={filteredTodoListTasks.map(task => task.id)}>
				<List>
					{filteredTodoListTasks.map(({ id, title, isCompleted }: TaskType) => {
						return (
							<TodoListItem
								id={id}
								title={title}
								isCompleted={isCompleted}
								onTaskStatusChange={handleTaskStatusChange}
								onUpdateTaskTitle={handleUpdateTaskTitle}
								onRemoveTask={handleRemoveTask}
							/>
						)
					})}
				</List>
			</SortableWrapper>
		</DndContext >

	const handleChangeTasksStatus = (filter: tasksFilterValuesType) => () => dispatch(changeTodoListStatus(id, filter));

	const handleRemoveTodoList = () => {
		dispatch(removeTodoListAction(id));
		// removeTodoList(todoListID);
	}

	const handleAddTask = (title: string) => {
		// dispatch(addTaskAction())
		dispatch((addTaskAction(title, id)));
		// addTask(todoListID, title);
	}

	const handleUpdateTodoListTitle = (title: string) => {
		// updateTodoListTitle(todoListID, title);
	}

	return (
		<div>
			<div className={s.todolistContainerTitle}>
				<h3>
					<EditableSpan
						className={''}
						title={title}
						onChange={handleUpdateTodoListTitle}
					/>
				</h3>
				<IconButton onClick={handleRemoveTodoList}>
					<DeleteIcon />
				</IconButton>
			</div>
			<AddItemForm addItem={handleAddTask} />
			{tasksList}
			<Box
				sx={statusButtonsGroupSX}
			>
				<StatusButton
					isActive={status === 'all'}
					variant="text"
					onClick={handleChangeTasksStatus('all')}
				>
					{'all'}
				</StatusButton>
				<StatusButton
					isActive={status === 'active'}
					variant="text"
					onClick={handleChangeTasksStatus('active')}
				>
					{'active'}
				</StatusButton>
				<StatusButton
					isActive={status === 'completed'}
					variant="text"
					onClick={handleChangeTasksStatus('completed')}
				>
					{'completed'}
				</StatusButton>
			</Box>
		</div >
	)
}
