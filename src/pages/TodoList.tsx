
import { ChangeEvent, MouseEvent } from "react";
import classNames from 'classnames';
import { styled } from '@mui/material/styles';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from "@dnd-kit/modifiers";

//components
// import { Button } from "../elements/ui/Button";
// import { Checkbox } from "../elements/ui/Checkbox";
import { AddItemForm } from "../components/AddItemForm";
import { DraggableContainer } from "../components/DraggableTask";
import { EditableSpan } from "../components/EditableSpan";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


//components mui
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button, { ButtonProps } from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import { StatusButton } from "../elements/material/StatusButton";

//css 
import s from './TodoList.module.css';
import { filterButtonContainerSX, getListItemSX } from "./TodoList.styles";

//types
import { tasksFilterValuesType } from "./TodoListContainer";

export type TaskType = {
  id: string
  title: string
  isCompleted: boolean
}

type TodoListPropsType = {
  todoLists: any
  title: string
  todoListID: string
  tasksFilter: tasksFilterValuesType
  tasks: Array<TaskType>
  addTask: (todoListID: string, title: string) => void
  updateTaskTitle: (todoListID: string, taskId: string, title: string) => void
  updateTodoListTitle: (todoListID: string, title: string) => void
  removeTodoList: (todoListID: string) => void
  removeTask: (todoListID: string, taskId: string) => void
  changeFilter: (todoListID: string, filter: tasksFilterValuesType) => void
  changeTaskStatus: (todoListID: string, id: string, isCompleted: boolean) => void
  handleDragEndTask: (todoListID: string, newTasks: Array<TaskType>) => void
}

export const TodoList = (props: TodoListPropsType) => {

  const {
    todoLists,
    title,
    tasks,
    todoListID,
    addTask,
    updateTaskTitle,
    updateTodoListTitle,
    removeTask,
    removeTodoList,
    tasksFilter,
    changeFilter,
    changeTaskStatus,
    handleDragEndTask
  } = props;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = filteredTodoListTasks.findIndex((task) => task.id === active.id);
      const newIndex = filteredTodoListTasks.findIndex((task) => task.id === over?.id);
      const newTasks = arrayMove(filteredTodoListTasks, oldIndex, newIndex);
      handleDragEndTask(todoListID, newTasks);
    }
  };

  const handleRemoveTask = (event: MouseEvent<HTMLButtonElement>, taskId: string) => {
    event.stopPropagation();
    removeTask(todoListID, taskId);
  }

  const handleTaskStatusChange = (event: ChangeEvent<HTMLInputElement>, taskId: string) => {
    event.stopPropagation();
    const { checked } = event.currentTarget;
    changeTaskStatus(todoListID, taskId, checked);
  }

  const handleUpdateTaskTitle = (taskId: string, title: string) => {
    updateTaskTitle(todoListID, taskId, title);
  }

  const tasksList: JSX.Element = filteredTodoListTasks.length === 0
    ? <span>Tasks list is empty</span>
    :
    <DndContext sensors={sensors} collisionDetection={closestCenter} modifiers={[restrictToParentElement]} onDragEnd={handleDragEnd}>
      <SortableContext items={filteredTodoListTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        {/* <ul> */}
        <List>
          {filteredTodoListTasks.map(({ id, title, isCompleted }: TaskType) => {
            return (
              <DraggableContainer key={id} id={id}>
                <ListItem key={id}
                  sx={getListItemSX(isCompleted)}
                  className={s.taskItem}
                >
                  <div>
                    <Checkbox checked={isCompleted} onChange={(event) => handleTaskStatusChange(event, id)} />
                    <EditableSpan title={title} onChange={(title) => handleUpdateTaskTitle(id, title)} />
                  </div>
                  {/* <li className={s.taskItem}> */}
                  {/* <Checkbox
                    id={id}
                    isChecked={isCompleted}
                    onChange={(event) => handleTaskStatusChange(event, id)}
                  /> */}
                  <IconButton onClick={(event) => handleRemoveTask(event, id)}>
                    <DeleteIcon />
                  </IconButton>
                  {/* <Button title={'x'} onClick={(event) => handleRemoveTask(event, id)} /> */}
                </ListItem>
                {/* <li /> */}
              </DraggableContainer>
            )
          })}
        </List>
        {/* </ul> */}
      </SortableContext>
    </DndContext >

  const handleChangeTasksFilter = (filter: tasksFilterValuesType) => () => changeFilter(todoListID, filter);

  const handleRemoveTodoList = () => {
    removeTodoList(todoListID);
  }

  const handleAddTask = (title: string) => {
    addTask(todoListID, title);
  }

  const handleUpdateTodoListTitle = (title: string) => {
    updateTodoListTitle(todoListID, title);
  }

  // const CustomButton = styled(Button)(({ theme, active: any }) => ({
  //   '&.MuiButton-text': {
  //     color: theme.palette.text.primary,
  //   },
  //   ...(active && {
  //     backgroundColor: 'blue',
  //     color: 'white',
  //     '&:hover': {
  //       backgroundColor: 'darkblue',
  //     },
  //   }),
  // }));

  return (
    // <div className={s.todolistContainer}>
    <div>
      <div className={s.todolistContainerTitle}>
        <h3>
          <EditableSpan
            className={''}
            title={title}
            onChange={handleUpdateTodoListTitle}
          />
        </h3>
        <IconButton onClick={handleRemoveTodoList}>
          <DeleteIcon />
        </IconButton>
        {/* <Button title={'x'} onClick={handleRemoveTodoList} /> */}
      </div>
      <AddItemForm addItem={handleAddTask} />
      {tasksList}
      <Box
        sx={filterButtonContainerSX}
      >
        {/* <div className={s.statusesButtonGroup}> */}
        <StatusButton
          isActive={tasksFilter === 'all'}
          variant="text"
          onClick={handleChangeTasksFilter('all')}
        >
          {'all'}
        </StatusButton>
        {/* <Button
          title={'All'}
          className={
            classNames(
              s.filterButton,
              [tasksFilter === 'all' ? s.activeButton : '']
            )}
          onClick={handleChangeTasksFilter('all')}
        /> */}
        {/* <Button
          title={'Active'}
          className={
            classNames(
              s.filterButton,
              [tasksFilter === 'active' ? s.activeButton : '']
            )}
          onClick={handleChangeTasksFilter('active')}
        /> */}
        <StatusButton
          isActive={tasksFilter === 'active'}
          variant="text"
          onClick={handleChangeTasksFilter('active')}
        >
          {'active'}
        </StatusButton>
        <StatusButton
          isActive={tasksFilter === 'completed'}
          variant="text"
          onClick={handleChangeTasksFilter('completed')}
        >
          {'completed'}
        </StatusButton>
        {/* <Button
          title={'Completed'}
          className={
            classNames(
              s.filterButton,
              [tasksFilter === 'completed' ? s.activeButton : '']
            )}
          onClick={handleChangeTasksFilter('completed')}
        /> */}
      </Box>
      {/* </div> */}
    </div >
  )
}
