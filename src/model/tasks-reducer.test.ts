
//actions
import { addTaskAction, changeTaskStatusAction, changeTaskTitleAction, removeTaskAction } from './tasks-actions';
import { tasksReducer } from './tasksReducer';

//types
import { TodoListTasksType } from '../pages/TodoListContainer'
import { removeTodoListAction } from './todolists-actions';

let startState: TodoListTasksType;


beforeEach(() => {
	startState = {
		'todolistId1': [
			{ id: '1', title: 'CSS', isCompleted: false },
			{ id: '2', title: 'JS', isCompleted: true },
			{ id: '3', title: 'React', isCompleted: false }
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isCompleted: false },
			{ id: '2', title: 'milk', isCompleted: true },
			{ id: '3', title: 'tea', isCompleted: false }
		]
	}
})

test('correct task should be deleted from correct array', () => {

	const action = removeTaskAction('2', 'todolistId2');

	const endState = tasksReducer(startState, action)

	expect(endState).toEqual({
		'todolistId1': [
			{ id: '1', title: 'CSS', isCompleted: false },
			{ id: '2', title: 'JS', isCompleted: true },
			{ id: '3', title: 'React', isCompleted: false }
		],
		'todolistId2': [
			{ id: '1', title: 'bread', isCompleted: false },
			{ id: '3', title: 'tea', isCompleted: false }
		]
	})
})

test('correct task should be added to correct array', () => {

	const action = addTaskAction('juce', 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3);
	expect(endState['todolistId2'].length).toBe(4)
	expect(endState['todolistId2'][0].id).toBeDefined()
	expect(endState['todolistId2'][0].title).toBe('juce')
	expect(endState['todolistId2'][0].isCompleted).toBe(false)
})

test('status of specified task should be changed', () => {

	const action = changeTaskStatusAction('2', false, 'todolistId2')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId2'][1].isCompleted).toBe(false);
	expect(endState['todolistId1'][1].isCompleted).toBe(true);
})

test('title of specified task should be changed', () => {

	const action = changeTaskTitleAction('todolistId2', '3', 'coffee')

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId2'][2].title).toBe('coffee');
	expect(endState['todolistId2'][2].title).toEqual(action.payload.title);
	expect(endState['todolistId2'][1].title).toBe('milk');
	expect(endState['todolistId1']).toEqual(startState['todolistId1']);
	expect(endState['todolistId2'].length).toBe(startState['todolistId2'].length);
})

test('property with todolistId should be deleted', () => {

	const action = removeTodoListAction('todolistId2')

	const endState = tasksReducer(startState, action)


	const keys = Object.keys(endState)

	expect(keys.length).toBe(1);
	expect(endState['todolistId2']).not.toBeDefined();
})

