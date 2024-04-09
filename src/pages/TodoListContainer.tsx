import React, { useState } from 'react';
import { v1 } from 'uuid';
import { createTheme, ThemeProvider } from '@mui/material/styles';


//components
import { TodoList } from './TodoList';
import { AddItemForm } from '../components/AddItemForm';
import { TaskType } from './TodoList';

//components/mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { MenuButton } from '../elements/material/MenuButton';
import Switch from '@mui/material/Switch';

//styles
import { filterButtonContainerSX } from './TodoList.styles';
import CssBaseline from '@mui/material/CssBaseline'


export type tasksFilterValuesType = 'all' | 'active' | 'completed';


type ThemeMode = 'dark' | 'light'

type TodoListType = {
	id: string
	title: string
	status: tasksFilterValuesType
}

type TodoListTasksType = {
	[key: string]: TaskType[]
}

export const TodoListContainer = () => {

	const [themeMode, setThemeMode] = useState<ThemeMode>('light');

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				// main: 'purple'
				// main: '#827cfa'
				main: '#6C63FF'
			},
			// secondary: 'purple',
		},
	});

	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todoLists, setTodoLists] = useState<TodoListType[]>([
		{ id: todolistID1, title: 'What to learn', status: 'all' },
		{ id: todolistID2, title: 'What to buy', status: 'all' },
	])

	let [tasks, setTasks] = useState<TodoListTasksType>({
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isCompleted: true },
			{ id: v1(), title: 'JS', isCompleted: true },
			{ id: v1(), title: 'ReactJS', isCompleted: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Buy chiken', isCompleted: true },
			{ id: v1(), title: 'Buy eggs', isCompleted: false },
			{ id: v1(), title: 'Buy milk', isCompleted: true },
		],
	})

	const addTodoList = (title: string) => {
		const newTodoListID = v1();
		const newTodoList: TodoListType = { id: newTodoListID, title, status: 'all' };
		setTodoLists([newTodoList, ...todoLists]);
		setTasks({ ...tasks, [newTodoListID]: [] });
	}


	const removeTodoList = (todoListID: string) => {
		setTodoLists(todoLists.filter(list => list.id !== todoListID));
		delete tasks[todoListID];
		setTasks({ ...tasks });
	}


	const removeTask = (todoListID: string, taskId: string) => {
		setTasks({ ...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId) });
	}

	const addTask = (todoListID: string, title: string) => {
		const newTask: TaskType = {
			id: v1(),
			title,
			isCompleted: false
		};

		setTasks({ ...tasks, [todoListID]: [newTask, ...tasks[todoListID]] });
	}

	const updateTaskTitle = (todoListId: string, taskId: string, title: string) => {
		setTasks({
			...tasks, [todoListId]: tasks[todoListId].map((task) => task.id === taskId
				? { ...task, title }
				: task)
		});
	}

	const updateTodoListTitle = (todoListId: string, title: string) => {
		setTodoLists(todoLists.map((list) => list.id === todoListId
			? { ...list, title: title }
			: list));
	}

	const onChangeFilter = (todoListID: string, status: tasksFilterValuesType) => {
		setTodoLists(todoLists.map(list => (list.id === todoListID
			? { ...list, status }
			: list
		)));
	}

	const onChangeTaskStatus = (todoListID: string, taskId: string, taskStatus: boolean) => {
		setTasks({
			...tasks,
			[todoListID]: tasks[todoListID].map((task) => task.id === taskId
				? { ...task, isCompleted: taskStatus }
				: task
			)
		});
	}

	const handleChangeTheme = () => {
		setThemeMode(themeMode == 'light' ? 'dark' : 'light')
	}

	const handleDragEndTask = (todoListID: string, newTasks: Array<TaskType>) => {
		setTasks(prevTasks => ({
			...prevTasks,
			[todoListID]: newTasks
		}))
	}

	return (
		<ThemeProvider theme={theme}>
			{/* <ButtonAppBar /> */}
			<CssBaseline />
			<AppBar position="static" sx={{ mb: '30px' }}>
				<Toolbar sx={filterButtonContainerSX}>
					<IconButton
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					</Typography>
					<div>
						<MenuButton background={theme.palette.primary.light}>Login</MenuButton>
						<MenuButton background={theme.palette.primary.light}>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
						<Switch onChange={handleChangeTheme} />
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{ mb: '30px' }}>
					<AddItemForm addItem={addTodoList} />
				</Grid>
				<Grid container>
					{
						todoLists.map(({ id, title, status }) => {
							return (
								<Grid item sx={{ m: '10px' }}>
									<Paper elevation={3} sx={{ p: '20px' }}>
										<TodoList
											todoLists={todoLists}
											key={id}
											todoListID={id}
											title={title}
											tasksFilter={status}
											tasks={tasks[id]}
											removeTask={removeTask}
											removeTodoList={removeTodoList}
											addTask={addTask}
											updateTaskTitle={updateTaskTitle}
											updateTodoListTitle={updateTodoListTitle}
											changeFilter={onChangeFilter}
											changeTaskStatus={onChangeTaskStatus}
											handleDragEndTask={handleDragEndTask}
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