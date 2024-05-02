import { v1 } from 'uuid';

//types
import { TodoListType } from '../pages/TodoListContainer';
import { AddTodoListActionType, RemoveTodoListActionType, ChangeTodoListTitleActionType, ChangeTodoListStatusActionType } from './todolists-actions';

// type ActionsType = {
// 	type: string,
// 	payload: any
// }

export type TodoListsActionsType =
	| AddTodoListActionType
	| RemoveTodoListActionType
	| ChangeTodoListTitleActionType
	| ChangeTodoListStatusActionType


let todolistID1 = v1();
let todolistID2 = v1();

// const intialState: Array<TodoListType> = [
// 	{ id: todolistID1, title: 'What to learn', status: 'all' },
// 	{ id: todolistID2, title: 'What to buy', status: 'all' },
// ]

export let intialTodoListsState: Array<TodoListType> = [];

export const todoListsReducer = (state: Array<TodoListType> = intialTodoListsState, action: TodoListsActionsType): Array<TodoListType> => {

	switch (action.type) {

		case 'ADD-TODOLIST':
			const newTodoList: TodoListType = { id: action.payload.todoListID, title: action.payload.title, status: 'all' };
			return [...state, newTodoList];

		case 'REMOVE-TODOLIST':
			return state.filter(todolist => todolist.id !== action.payload.id);

		case 'CHANGE-TODOLIST-TITLE':
			return state.map(todolist => todolist.id === action.payload.id
				? { ...todolist, title: action.payload.title }
				: todolist);

		case 'CHANGE-TODOLIST-STATUS':
			return state.map(todolist => todolist.id === action.payload.id
				? { ...todolist, status: action.payload.status }
				: todolist);
		default:
			return state;
		// throw new Error('No actions of this type were found');
	}

}
