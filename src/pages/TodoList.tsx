
import { ChangeEvent, useState } from "react";
import classNames from 'classnames';

//components
import { Button } from "../elements/ui/Button";
import { TodoListHeader } from "../elements/ui/TodoListHeader";
import { Checkbox } from "../elements/ui/Checkbox";
import { AddItemForm } from "../components/AddItemForm";

//css 
import s from './TodoList.module.css';

//types
import { tasksFilterValuesType } from "./TodoListContainer";

export type TaskType = {
  id: string
  title: string
  isCompleted: boolean
}

type TodoListPropsType = {
  title: string
  todoListID: string
  tasksFilter: tasksFilterValuesType
  tasks: Array<TaskType>
  addTask: (todoListID: string, title: string) => void
  removeTodoList: (todoListID: string) => void
  removeTask: (todoListID: string, taskId: string) => void
  changeFilter: (todoListID: string, filter: tasksFilterValuesType) => void
  // changeFilter: (filter: tasksFilterValuesType) => void
  // changeTaskStatus: (id: string, status: tasksFilterValuesType) => void
  changeTaskStatus: (todoListID: string, id: string, isCompleted: boolean) => void
}

export const TodoList = (props: TodoListPropsType) => {

  const {
    title,
    tasks,
    todoListID,
    addTask,
    removeTask,
    removeTodoList,
    tasksFilter,
    changeFilter,
    changeTaskStatus
  } = props;

  const getTodoListTasks = () => {

    if (tasksFilter === 'active') {
      return tasks.filter(task => !task.isCompleted);
    }

    if (tasksFilter === 'completed') {
      return tasks.filter(task => task.isCompleted);
    }

    return tasks;
  }

  const filteredTodoListTasks = getTodoListTasks();

  const [inputTaskValue, setInputTaskValue] = useState('');
  const [errors, setErrors] = useState<Array<string> | []>([]);

  const inputTaskLength = inputTaskValue.length;

  const tasksList: JSX.Element = filteredTodoListTasks.length === 0
    ? <span>Tasks list is empty</span>
    : <ul>
      {filteredTodoListTasks.map(({ id, title, isCompleted }: TaskType) => {
        const handleRemoveTask = () => {
          removeTask(todoListID, id);
        }
        const handleTaskStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
          const { checked } = event.currentTarget;
          changeTaskStatus(todoListID, id, checked);
        }
        return (
          <li key={id} className={s.taskItem}>
            <Checkbox
              id={id}
              label={title}
              isChecked={isCompleted}
              onChange={handleTaskStatusChange}
            />
            <Button title={'x'} onClick={handleRemoveTask} />
          </li>
        )
      })}
    </ul>;

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInputTaskValue(event.currentTarget.value);
  // }

  // const handleAddTask = () => {
  //   const trimmedTaskValue = inputTaskValue.trim();
  //   if (trimmedTaskValue !== '') {
  //     addTask(todoListID, inputTaskValue.trim());
  //   } else {
  //     setErrors(['This field is required']);
  //   };
  //   setInputTaskValue('');
  // }

  // const handleAddTaskOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
  //   setErrors([]);
  //   if (event.key === 'Enter' && inputTaskLength) {
  //     handleAddTask();
  //   }
  // }

  const handleChangeTasksFilter = (filter: tasksFilterValuesType) => () => changeFilter(todoListID, filter);

  const handleRemoveTodoList = () => {
    removeTodoList(todoListID);
  }

  const handleAddTask = (title: string) => {
    addTask(todoListID, title);
  }

  return (
    <div className={s.todolistContainer}>
      <div className={s.todolistContainerTitle}>
        <TodoListHeader title={title} />
        <Button title={'x'} onClick={handleRemoveTodoList} />
      </div>
      <AddItemForm addItem={handleAddTask} />
      {tasksList}
      <div className={s.statusesButtonGroup}>
        <Button
          title={'All'}
          className={
            classNames(
              s.filterButton,
              [tasksFilter === 'all' ? s.activeButton : '']
            )}
          onClick={handleChangeTasksFilter('all')}
        />
        <Button
          title={'Active'}
          className={
            classNames(
              s.filterButton,
              [tasksFilter === 'active' ? s.activeButton : '']
            )}
          onClick={handleChangeTasksFilter('active')}
        />
        <Button
          title={'Completed'}
          className={
            classNames(
              s.filterButton,
              [tasksFilter === 'completed' ? s.activeButton : '']
            )}
          onClick={handleChangeTasksFilter('completed')}
        />
      </div>
    </div >
  )
}
