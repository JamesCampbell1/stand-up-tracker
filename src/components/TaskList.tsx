import React from 'react';
import { DragDropContext, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ListType, TaskListModel, TaskModel } from '../types';
import { Task } from './Task';

interface Props {
    taskList: TaskListModel;
    setTaskList: React.Dispatch<React.SetStateAction<null | TaskListModel>>;
    listType: ListType;
}

const reorder = (list: TaskModel[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

// Todo: implement moving
// const move = (source, destination, droppableSource, droppableDestination) => {
//     const sourceClone = Array.from(source);
//     const destinationClone = Array.from(destination);
//     const [removed] = sourceClone.splice(droppableSource.index, 1);

//     destinationClone.splice(droppableDestination.index, 0, removed);

//     const result: any = {};
//     result[droppableSource.droppableId] = sourceClone;
//     result[droppableDestination.droppableId] = destinationClone;

//     return result;
// }

export const TaskList = ({ taskList, setTaskList, listType }: Props) => {

    const {saveList} = useLocalStorage();

    const deleteTask = (index: number) => {
        const newTaskList = {...taskList};
        const deletedTask = newTaskList.tasks.splice(index, 1);
        setTaskList(newTaskList);
        saveList(newTaskList, listType);
        
        return deletedTask;
    }

    const onDragEnd = ({source, destination}: DropResult) => {

        const droppedOutsideTheList = !destination;
        const droppedInSameOrder = (destination?.index === source.index);

        if (droppedOutsideTheList || droppedInSameOrder) {
            return;
        }

        const droppedInsideTheSameList = (source.droppableId === destination.droppableId);

        if (droppedInsideTheSameList) {
            const tasks = reorder(taskList.tasks, source.index, destination.index);
            setTaskList({...taskList, tasks});
        } else {
            // Todo: handle dropped in another list
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
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
        </DragDropContext>
    );
};