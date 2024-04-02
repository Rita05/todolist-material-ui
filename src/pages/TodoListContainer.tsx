import React, { useState } from 'react';
import { v1 } from 'uuid';

//components
import { TodoList } from './TodoList';
import { AddItemForm } from '../components/AddItemForm';

//types
import { TaskType } from './TodoList';

export type tasksFilterValuesType = 'all' | 'active' | 'completed';

type TodoListType = {
	id: string
	title: string
	status: tasksFilterValuesType
}

type TodoListTasksType = {
	[key: string]: TaskType[]
}

export const TodoListContainer = () => {

	const todoListTitle = 'TodoList';
	// const initialTasks: Array<TaskType> = [
	// 	{
	// 		id: v1(),
	// 		title: 'Do homework on React',
	// 		isCompleted: true
	// 	},
	// 	{
	// 		id: v1(),
	// 		title: 'Do homework on JS',
	// 		isCompleted: false
	// 	},
	// 	{
	// 		id: v1(),
	// 		title: 'Do exams of the current sprint week',
	// 		isCompleted: true
	// 	},
	// 	{
	// 		id: v1(),
	// 		title: 'Learn theory for the interview',
	// 		isCompleted: false,
	// 	}
	// ]

	// const [tasks, setTasks] = <Array<TaskType>>(initialTasks);
	// const [tasksFilter, setTasksFilter] = useState<tasksFilterValuesType>('all');

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todoLists, setTodoLists] = useState<TodoListType[]>([
		{ id: todolistID1, title: 'What to learn', status: 'active' },
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

	// const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
	// 	{ id: v1(), title: 'What to learn', status: 'active' },
	// 	{ id: v1(), title: 'What to buy', status: 'all' },
	// ])

	const getFilteredTasks = (tasks: Array<TaskType>, currentFilter: tasksFilterValuesType): Array<TaskType> => {
		switch (currentFilter) {
			case 'active':
				return tasks.filter(task => !task.isCompleted);

			case 'completed':
				return tasks.filter(task => task.isCompleted);

			default:
				return tasks;
		}
	}


	// const filteredTasks = getFilteredTasks(tasks, tasksFilter);


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
		// setTasks(tasks.filter(task => task.id !== taskId));
	}

	const addTask = (todoListID: string, title: string) => {
		const newTask: TaskType = {
			id: v1(),
			title,
			isCompleted: false
		};

		setTasks({ ...tasks, [todoListID]: [newTask, ...tasks[todoListID]] });

		// setTasks([newTask, ...tasks]);
	}

	const onChangeFilter = (todoListID: string, status: tasksFilterValuesType) => {
		// setTasksFilter(filter);
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
		// const onChangeTaskStatus = (todoListId: string, status: tasksFilterValuesType) => {
		// const updatedTasks = tasks.map((task) => {
		// 	return task.id === taskId ? { ...task, isCompleted: taskStatus } : task;
		// })
		// setTasks(updatedTasks);
		// setTodoLists(todoLists.map(tl => (tl.id === todoListId ? { ...tl, status } : tl)));
	}

	const getTodoListTasks = (todoListId: string, status: string) => {

		if (status === 'active') {
			return tasks[todoListId].filter(task => !task.isCompleted);
		}

		if (status === 'completed') {
			return tasks[todoListId].filter(task => task.isCompleted);
		}

		return tasks[todoListId];
	}
	return (
		<>
			{/* <TodoList
				title={todoListTitle}
				tasksFilter={tasksFilter}
				tasks={filteredTasks}
				removeTask={removeTask}
				addTask={addTask}
				changeFilter={onChangeFilter}
				changeTaskStatus={onChangeTaskStatus}
			/> */}
			<AddItemForm addItem={addTodoList} />
			{
				todoLists.map(({ id, title, status }) => {
					return (
						<TodoList
							key={id}
							todoListID={id}
							title={title}
							tasksFilter={status}
							tasks={tasks[id]}
							// tasks={filteredTasks}
							removeTask={removeTask}
							removeTodoList={removeTodoList}
							addTask={addTask}
							changeFilter={onChangeFilter}
							changeTaskStatus={onChangeTaskStatus}
						/>
					)
				})
			}
		</>
	)
}