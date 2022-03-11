import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ListType } from '../types';
import { DeleteIcon } from './DeleteIcon';
import { SwapIcon } from './SwapIcon';

interface Props {
    taskList: [] | string[];
    setTaskList: React.Dispatch<React.SetStateAction<[] | string[]>>;
    otherTaskList: [] | string[];
    setOtherTaskList: React.Dispatch<React.SetStateAction<[] | string[]>>;
    listType: ListType;
}

export const TaskList = ({ taskList, setTaskList, otherTaskList, setOtherTaskList, listType }: Props) => {

    const {saveList} = useLocalStorage();

    const deleteTask = (index: number) => {
        const newTaskList = taskList.slice();
        const deletedTask = newTaskList.splice(index, 1);
        setTaskList(newTaskList);
        saveList(newTaskList, listType);
        
        return deletedTask;
    }

    const moveTask = (index: number) => {
        const taskToMove = deleteTask(index);
        const newOtherTaskList = [...otherTaskList, ...taskToMove];
        setOtherTaskList(newOtherTaskList);

        const otherListType = listType === 'today' ? 'yesterday' : 'today';
        
        saveList(newOtherTaskList, otherListType);
    }

    return (
        <ul className="task-list">
            {
                taskList.length ?
                taskList.map((task: string, index: number) =>
                    <li key={listType + index}>
                        {task}
                        <div className="delete-button-container">
                            
                            <button className="warning" onClick={() => moveTask(index)}><SwapIcon /></button>
                            <button className="danger icon-button" onClick={() => deleteTask(index)}><DeleteIcon /></button>
                        </div>
                    </li>    
                ) :
                <p>👀 A very productive day doing nothing...</p>
            }
        </ul>
    );
};