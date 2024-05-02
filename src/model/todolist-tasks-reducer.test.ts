import { TodoListTasksType, TodoListType } from "../pages/TodoListContainer"
import { tasksReducer } from "./tasksReducer"
import { addTodoListAction } from "./todolists-actions"
import { todoListsReducer } from "./todolistsReducer"

test('ids should be equals', () => {
    const startTasksState: TodoListTasksType = {}
    const startTodolistsState: Array<TodoListType> = []

    const action = addTodoListAction('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todoListID)
    expect(idFromTodolists).toBe(action.payload.todoListID)
})


