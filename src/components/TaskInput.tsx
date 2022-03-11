import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ListType } from '../types';

interface Props {
    taskList: string[];
    setTaskList: React.Dispatch<React.SetStateAction<[] | string[]>>
    listType: ListType;
}

export const TaskInput = ({ taskList, setTaskList, listType }: Props) => {

    const [taskName, setTaskName] = useState('');
    const {saveList} = useLocalStorage();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTaskList = [...taskList, taskName];
        setTaskList(newTaskList);
        saveList(newTaskList, listType);
        setTaskName('');
    }

    return (
        <form className="form-group" onSubmit={onSubmit}>
            <input 
                type="text" 
                className="form-field" 
                placeholder="Task" 
                name={`${listType}-task-input`}
                id={`${listType}-task-input`} 
                required
                value={taskName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {setTaskName(e.currentTarget.value)}}
            />
            <label htmlFor={`${listType}-task-input`} className="form-label">Task name</label>
            <button className="add-button" type="submit">Add</button>
        </form>
    );
};