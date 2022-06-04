import React, { useEffect, useState } from 'react';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TaskListModel, TaskModel } from '../types';
import { ColumnHeader } from './ColumnHeader';
import { DaySection } from './DaySection';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';

export const Tracker = () => {

    const {getList, getNextId, saveList} = useLocalStorage();

    const [yesterdayTaskList, setYesterdayTaskList] = useState<TaskListModel>(getList('yesterday'));
    const [todayTaskList, setTodayTaskList] = useState<TaskListModel>(getList('today'));
    const [blockerTaskList, setBlockerTaskList] = useState<TaskListModel>(getList('blocker'));
    const [nextTaskId, setNextTaskId] = useState(parseInt(getNextId() ?? '1'));
    
    const reorder = (list: TaskModel[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    }
    
    const move = (source: TaskModel[], destination: TaskModel[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
        const sourceClone = Array.from(source);
        const destinationClone = Array.from(destination);

        const [removed] = sourceClone.splice(droppableSource.index, 1);
    
        destinationClone.splice(droppableDestination.index, 0, removed);
    
        const result: any = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destinationClone;
    
        return result;
    }

    // Todo: should be using a reducer for moving and re-ordering
    const onDroppedInsideTheSameList = (source: DraggableLocation, destination: DraggableLocation) => {
        if (source.droppableId === 'yesterday-list') {
            const tasks = reorder(yesterdayTaskList!.tasks, source.index, destination.index);
            setYesterdayTaskList({...yesterdayTaskList!, tasks});
            saveList({...yesterdayTaskList!, tasks}, 'yesterday');
        } else if (source.droppableId === 'today-list') {
            const tasks = reorder(todayTaskList!.tasks, source.index, destination.index);
            setTodayTaskList({...todayTaskList!, tasks});
            saveList({...todayTaskList!, tasks}, 'today');
        } else {
            const tasks = reorder(blockerTaskList!.tasks, source.index, destination.index);
            setBlockerTaskList({...blockerTaskList!, tasks});
            saveList({...blockerTaskList!, tasks}, 'blocker');
        }
    }

    const setTaskList = (listId: string, tasks: TaskModel[]) => {
        if (listId === 'yesterday-list') {
            setYesterdayTaskList({...yesterdayTaskList!, tasks});
            saveList({...yesterdayTaskList!, tasks}, 'yesterday');
        } else if (listId === 'today-list') {
            setTodayTaskList({...todayTaskList!, tasks});
            saveList({...todayTaskList!, tasks}, 'today');
        } else {
            setBlockerTaskList({...blockerTaskList!, tasks});
            saveList({...blockerTaskList!, tasks}, 'blocker');
        }
    }

    const getSourceTasks = (listId: string) => {
        if (listId === 'yesterday-list') {
            return yesterdayTaskList!.tasks;
        } else if (listId === 'today-list') {
            return todayTaskList!.tasks;
        } else {
            return blockerTaskList!.tasks;
        }
    }

    const onDroppedInsideDifferentList = (source: DraggableLocation, destination: DraggableLocation) => {
        const result = move(getSourceTasks(source.droppableId), getSourceTasks(destination.droppableId), source, destination);

        Object.keys(result).forEach(listId => {
            setTaskList(listId, result[listId]);
        })
    }

    const onDragEnd = ({source, destination}: DropResult) => {

        const droppedOutsideTheList = !destination;
        
        if (droppedOutsideTheList) {
            return;
        }
        
        const droppedInsideTheSameList = (source.droppableId === destination.droppableId);
        const droppedInSameOrder = (destination?.index === source.index);

        if (droppedInsideTheSameList && droppedInSameOrder) {
            return;
        }

        if (droppedInsideTheSameList) {
            onDroppedInsideTheSameList(source, destination);
        } else {
            onDroppedInsideDifferentList(source, destination);
        }
    }

    return (
        <div className="layout-grid">
            {
                yesterdayTaskList && todayTaskList && blockerTaskList &&
                <DragDropContext onDragEnd={onDragEnd}>
                    <DaySection
                        taskList={yesterdayTaskList} 
                        setTaskList={setYesterdayTaskList}
                        listType="yesterday"
                        nextTaskId={nextTaskId}
                        setNextTaskId={setNextTaskId}
                    />

                    <DaySection
                        taskList={todayTaskList} 
                        setTaskList={setTodayTaskList}
                        listType="today"
                        nextTaskId={nextTaskId}
                        setNextTaskId={setNextTaskId}
                    />

                    <div className="section blockers">
                        <div className="section-header">
                            <ColumnHeader title="blockers" />
                        </div>
                        <div className="content">
                            <TaskInput
                                taskList={blockerTaskList}
                                setTaskList={setBlockerTaskList}
                                listType="blocker"
                                nextTaskId={nextTaskId}
                                setNextTaskId={setNextTaskId}
                            />
                            <TaskList
                                taskList={blockerTaskList} 
                                setTaskList={setBlockerTaskList}
                                listType="blocker"
                            />
                        </div>
                    </div>
                </DragDropContext>
            }
        </div>
    );
};