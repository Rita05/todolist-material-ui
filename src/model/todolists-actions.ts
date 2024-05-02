import { v1 } from "uuid"
import { tasksFilterValuesType } from "../pages/TodoListContainer"

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
        todoListID: string
    },
}

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string,
    },
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        id: string,
        title: string,
    },
}

export type ChangeTodoListStatusActionType = {
    type: 'CHANGE-TODOLIST-STATUS',
    payload: {
        id: string,
        status: tasksFilterValuesType,
    },
}

export const addTodoListAction = (title: string): AddTodoListActionType => {
    return {
        type: 'ADD-TODOLIST',
        payload: { title, todoListID: v1() },
    } as const
}

export const removeTodoListAction = (todolistId: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId,
        }
    } as const
}

export const changeTodoListTitle = (todolistId: string, title: string): ChangeTodoListTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId,
            title,
        },
    } as const
}

export const changeTodoListStatus = (todolistId: string, status: tasksFilterValuesType): ChangeTodoListStatusActionType => {
    return {
        type: 'CHANGE-TODOLIST-STATUS',
        payload: {
            id: todolistId,
            status,
        },
    } as const
}
