import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ListType, TaskListModel } from '../types';

interface Props {
    taskList: TaskListModel;
    setTaskList: React.Dispatch<React.SetStateAction<null | TaskListModel>>
    listType: ListType;
}

export const TaskInput = ({ taskList, setTaskList, listType }: Props) => {

    const [taskName, setTaskName] = useState('');
    const {saveList} = useLocalStorage();

    const getNewTaskId = () => taskList.tasks?.length ? (Math.max(...taskList.tasks.map(a => a.id)) + 1) : 1;

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTaskList = {
            ...taskList,
            tasks: [
                ...(taskList.tasks ?? []),
                {id: getNewTaskId(), content: taskName}
            ]
        };

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
                autoComplete="off"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {setTaskName(e.currentTarget.value)}}
            />
            <label htmlFor={`${listType}-task-input`} className="form-label">Task name</label>
            <button className="add-button" type="submit">Add</button>
        </form>
    );
};