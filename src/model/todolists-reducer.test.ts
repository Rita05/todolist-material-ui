

import { v1 } from 'uuid'
import { TodoListType } from '../pages/TodoListContainer'
import { todoListsReducer } from './todolistsReducer'

//actions 
import { addTodoListAction, changeTodoListStatus, changeTodoListTitle, removeTodoListAction } from './todolists-actions'

// todolists tests

let todolistId1: string
let todolistId2: string

let initialState: Array<TodoListType>


beforeEach(() => {
	todolistId1 = v1();
	todolistId2 = v1();

	initialState = [
		{ id: todolistId1, title: 'What to learn', status: 'all' },
		{ id: todolistId2, title: 'What to buy', status: 'all' },
	]
})


test('correct todolist should be added', () => {

	const newTitle = 'Household duties';

	const endState = todoListsReducer(initialState, addTodoListAction(newTitle));

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTitle)
})

test('correct todolist should be removed', () => {

	const endState = todoListsReducer(initialState, removeTodoListAction(todolistId1));

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should change its name', () => {

	const newTitle = 'What products to buy';

	const endState = todoListsReducer(initialState, changeTodoListTitle(todolistId2, newTitle))

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTitle)
})

test('correct status of todolist should be changed', () => {

	const newStatus = 'completed';

	const endState = todoListsReducer(initialState, changeTodoListStatus(todolistId2, newStatus))

	expect(endState[0].status).toBe('all')
	expect(endState[1].status).toBe(newStatus)
})

// todolists tasks tests

