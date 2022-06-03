import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ListType, TaskListModel, TaskModel } from '../types';
import { Task } from './Task';

interface Props {
    taskList: TaskListModel;
    setTaskList: React.Dispatch<React.SetStateAction<TaskListModel>>;
    listType: ListType;
}

export const TaskList = ({ taskList, setTaskList, listType }: Props) => {

    const {saveList} = useLocalStorage();

    const deleteTask = (index: number) => {
        const newTaskList = {...taskList};
        const deletedTask = newTaskList.tasks.splice(index, 1);
        setTaskList(newTaskList);
        saveList(newTaskList, listType);
        
        return deletedTask;
    }

    return (
        <Droppable droppableId={`${listType}-list`}>
            {
                provided => (
                    <ul 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="task-list"
                    >
                        {
                            taskList.tasks?.length ?
                            taskList.tasks.map((task: TaskModel, index: number) =>
                                <Task 
                                    key={listType + task.id} 
                                    task={task} 
                                    index={index} 
                                    deleteTask={deleteTask}
                                    listType={listType}
                                />
                            ) :
                            <p>
                                {
                                    listType !== 'blocker' ?
                                    '👀 A very productive day doing nothing...' :
                                    '🐂 nothing is getting in your way today'
                                }
                            </p>
                        }
                        {provided.placeholder}
                    </ul>
                )
            }
        </Droppable>
    );
};