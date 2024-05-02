// export type RemoveTaskActionType = {
//     type: 'REMOVE-TASK'
//     payload: {
//         taskID: string,
//         todoListID: string
//     }
// }

export type RemoveTaskActionType = ReturnType<typeof removeTaskAction>

export type AddTaskActionType = ReturnType<typeof addTaskAction>

export type AddTodoListTaskActionType = ReturnType<typeof addTodoListAction>

// export type AddTaskActionType = {
//     type: 'ADD-TASK'
//     payload: {
//         todoListID: string,
//         title: string
//     }
// }

// export type ChangeTaskStatusActionType = {
//     type: 'CHANGE-TASK-STATUS'
//     payload: {
//         taskID: string,
//         status: boolean,
//         todoListID: string
//     }
// }

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAction>


// export type ChangeTaskTitleActionType = {
//     type: 'CHANGE-TASK-TITLE'
//     payload: {
//         todoListID: string,
//         taskID: string,
//         title: string
//     }
// }

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAction>

export const removeTaskAction = (taskID: string, todoListID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: { taskID, todoListID }
    } as const
}

export const addTaskAction = (title: string, todoListID: string) => {
    return {
        type: 'ADD-TASK',
        payload: { todoListID, title }
    } as const
}

export const changeTaskStatusAction = (taskID: string, status: boolean, todoListID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: { taskID, status, todoListID }
    } as const
}

export const changeTaskTitleAction = (todoListID: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: { todoListID, taskID, title }
    } as const
}

export const addTodoListAction = (title: string, todoListID: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: { todoListID, title }
    } as const
}
