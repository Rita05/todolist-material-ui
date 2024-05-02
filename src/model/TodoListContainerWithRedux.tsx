import React, { Reducer, useReducer, useState } from 'react';
import { v1 } from 'uuid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

//actions
import { changeTodoListStatus, changeTodoListTitle, removeTodoListAction, addTodoListAction } from '../model/todolists-actions';
import { addTaskAction, changeTaskStatusAction, changeTaskTitleAction, removeTaskAction } from '../model/tasks-actions';

//components
import { TodoList } from '../pages/TodoList';
import { AddItemForm } from '../components/AddItemForm';
import { TaskType } from '../pages/TodoList';

//components/mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ButtonAppBar } from '../components/ButtonAppBar';

//styles
import CssBaseline from '@mui/material/CssBaseline';
import { TodoListsActionsType, todoListsReducer } from '../model/todolistsReducer';
import { TasksActionsType, tasksReducer } from '../model/tasksReducer';
import { AppRootStateType } from './store';

export type tasksFilterValuesType = 'all' | 'active' | 'completed';

type ThemeMode = 'dark' | 'light'

export type TodoListType = {
	id: string
	title: string
	status: tasksFilterValuesType
}

export type TodoListTasksType = {
	[key: string]: TaskType[]
}

export const TodoListContainerWithRedux = () => {

	const [themeMode, setThemeMode] = useState<ThemeMode>('light');

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#6C63FF'
			},
		},
	});

	let todolistID1 = v1();
	let todolistID2 = v1();


	let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);

	// let tasks = useSelector<AppRootStateType, TodoListTasksType>(state => state.tasks);

	let dispatch = useDispatch();

	// let [todoLists, dispatchToTodoLists] = useReducer<Reducer<Array<TodoListType>, TodoListsActionsType>>(todoListsReducer, [
	// 	{ id: todolistID1, title: 'What to learn', status: 'all' },
	// 	{ id: todolistID2, title: 'What to buy', status: 'all' },
	// ])


	// let [tasks, dispatchToTasks] = useReducer<Reducer<TodoListTasksType, TasksActionsType>>(tasksReducer, {
	// 	[todolistID1]: [
	// 		{ id: v1(), title: 'HTML&CSS', isCompleted: true },
	// 		{ id: v1(), title: 'JS', isCompleted: true },
	// 		{ id: v1(), title: 'ReactJS', isCompleted: false },
	// 	],
	// 	[todolistID2]: [
	// 		{ id: v1(), title: 'Buy chiken', isCompleted: true },
	// 		{ id: v1(), title: 'Buy eggs', isCompleted: false },
	// 		{ id: v1(), title: 'Buy milk', isCompleted: true },
	// 	],
	// })

	const addTodoList = (title: string) => {
		const newTodoListID = v1();
		const newTodoList: TodoListType = { id: newTodoListID, title, status: 'all' };
		const action = addTodoListAction(title);
		// dispatchToTodoLists(action);
		// dispatchToTasks(action);
		dispatch(addTodoListAction(title));
		// dispatchToTasks(addTaskAction(title, newTodoListID))
		// setTodoLists([newTodoList, ...todoLists]);
		// setTasks({ ...tasks, [newTodoListID]: [] });
	}

	const removeTodoList = (todoListID: string) => {
		const action = removeTodoListAction(todoListID);
		// dispatchToTodoLists(action);
		// dispatchToTasks(action);
		dispatch(removeTodoListAction(todoListID));
		// dispatch(action);
		// setTodoLists(todoLists.filter(list => list.id !== todoListID));
		// delete tasks[todoListID];
		// setTasks({ ...tasks });
	}

	const updateTodoListTitle = (todolistId: string, title: string) => {
		// dispatchToTodoLists(changeTodoListTitle(todolistId, title));
		dispatch(changeTodoListTitle(todolistId, title));
		// setTodoLists(todoLists.map((list) => list.id === todolistId
		// 	? { ...list, title: title }
		// 	: list));
	}

	const removeTask = (todoListID: string, taskId: string) => {
		dispatch(removeTaskAction(taskId, todoListID));
		// dispatchToTasks(removeTaskAction(taskId, todoListID));
		// setTasks({ ...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId) });
	}

	const addTask = (todoListID: string, title: string) => {
		const newTask: TaskType = {
			id: v1(),
			title,
			isCompleted: false
		};
		dispatch(addTaskAction(title, todoListID));
		// dispatchToTasks(addTaskAction(title, todoListID));

		// setTasks({ ...tasks, [todoListID]: [newTask, ...tasks[todoListID]] });
	}

	const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
		// setTasks({
		//     ...tasks, [todolistId]: tasks[todolistId].map((task) => task.id === taskId
		//         ? { ...task, title }
		//         : task)
		// });
		// dispatchToTasks(changeTaskTitleAction(todolistId, taskId, title));
		dispatch(changeTaskTitleAction(todolistId, taskId, title));
	}

	const handleChangeStatus = (todoListID: string, status: tasksFilterValuesType) => {
		dispatch(changeTodoListStatus(todoListID, status));
		// dispatchToTodoLists(changeTodoListStatus(todoListID, status));
		// setTodoLists(todoLists.map(list => (list.id === todoListID
		// 	? { ...list, status }
		// 	: list
		// )));
	}

	const onChangeTaskStatus = (todoListID: string, taskId: string, taskStatus: boolean) => {
		// setTasks({
		//     ...tasks,
		//     [todoListID]: tasks[todoListID].map((task) => task.id === taskId
		//         ? { ...task, isCompleted: taskStatus }
		//         : task
		//     )
		// });
		// dispatchToTasks(changeTaskStatusAction(taskId, taskStatus, todoListID));
		dispatch(changeTaskStatusAction(taskId, taskStatus, todoListID));
	}

	const handleChangeTheme = () => {
		setThemeMode(themeMode == 'light' ? 'dark' : 'light');
	}

	const handleDragEndTask = (todoListID: string, newTasks: Array<TaskType>) => {
		// setTasks(prevTasks => ({
		//     ...prevTasks,
		//     [todoListID]: newTasks
		// }))
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ButtonAppBar onChangeTheme={handleChangeTheme} />
			<Container fixed>
				<Grid container sx={{ mb: '30px' }}>
					<AddItemForm addItem={addTodoList} />
				</Grid>
				<Grid container>
					{
						todoLists.map((list) => {
							return (
								<Grid item>
									<Paper elevation={3} sx={{ p: '20px', mr: '20px', mb: '20px' }}>
										<TodoList
											todoList={list}
										// key={id}
										// todoListID={id}
										// title={title}
										// tasksFilter={status}
										// tasks={tasks[id]}
										// removeTask={removeTask}
										// removeTodoList={removeTodoList}
										// addTask={addTask}
										// updateTaskTitle={updateTaskTitle}
										// updateTodoListTitle={updateTodoListTitle}
										// changeStatus={handleChangeStatus}
										// changeTaskStatus={onChangeTaskStatus}
										// handleDragEndTask={handleDragEndTask}
										/>
									</Paper>
								</Grid>
							)
						})
					}
				</Grid>
			</Container>
		</ThemeProvider>
	)
}


