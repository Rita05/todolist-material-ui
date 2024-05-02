import { v1 } from "uuid";
import { TaskType } from "../pages/TodoList";
//types
import { TodoListTasksType } from "../pages/TodoListContainer";
import { AddTaskActionType, ChangeTaskStatusActionType, ChangeTaskTitleActionType, RemoveTaskActionType } from "./tasks-actions";
import { AddTodoListActionType, RemoveTodoListActionType } from "./todolists-actions";

let todolistID1 = v1();
let todolistID2 = v1();

// const initialState =
// {
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
// }

export type TasksActionsType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodoListActionType
	| RemoveTodoListActionType

export let initialTasksState: TodoListTasksType = {}

export const tasksReducer = (state: TodoListTasksType = initialTasksState, action: TasksActionsType) => {
	switch (action.type) {

		case 'REMOVE-TASK':
			return {
				...state,
				[action.payload.todoListID]: state[action.payload.todoListID].
					filter((task) => task.id !== action.payload.taskID)
			}
		case 'ADD-TASK':
			const newTask: TaskType = {
				id: v1(),
				title: action.payload.title,
				isCompleted: false
			};
			return { ...state, [action.payload.todoListID]: [newTask, ...state[action.payload.todoListID]] }
		case 'CHANGE-TASK-STATUS':
			return {
				...state,
				[action.payload.todoListID]: state[action.payload.todoListID].
					map(task => task.id === action.payload.taskID
						? { ...task, isCompleted: action.payload.status }
						: task)
			}
		case 'CHANGE-TASK-TITLE':
			return {
				...state,
				[action.payload.todoListID]: state[action.payload.todoListID].
					map(task => task.id === action.payload.taskID
						? { ...task, title: action.payload.title }
						: task)
			}
		case 'ADD-TODOLIST':
			return {
				...state,
				[action.payload.todoListID]: []
			}
		case 'REMOVE-TODOLIST':
			let { [action.payload.id]: [], ...rest } = state;
			return rest;
		//второй вариант 
		// let copyState = { ...state };
		// delete copyState[action.payload.id];
		// return copyState;

		default:
			return state;
	}
}

// export type FirstActionType = {
// 	type: ''
// }
// export type SecondActionType = {
// 	type: ''
// }


// type ActionsType = FirstActionType | SecondActionType 

// export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
// 	switch (action.type) {
// 			case '':
// 					return state
// 			case '':
// 					return state
// 			default:
// 					throw new Error("I don't understand this type")
// 	}
// }

// export const firstAC = (todolistId: string): FirstActionType => {
// 	return { type: ''}
// }
// export const secondAC = (title: string): SecondActionType => {
// 	return { type: ''}
// }