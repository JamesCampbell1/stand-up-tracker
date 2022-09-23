import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ListType, TaskListModel } from '../types';
import { TextInput } from './TextInput';

interface Props {
    taskList: TaskListModel;
    setTaskList: React.Dispatch<React.SetStateAction<TaskListModel>>
    listType: ListType;
    nextTaskId: number;
    setNextTaskId: React.Dispatch<React.SetStateAction<number>>;
}

export const TaskInput = ({ taskList, setTaskList, listType, nextTaskId, setNextTaskId }: Props) => {

    const [taskName, setTaskName] = useState('');
    const {saveList, saveNextId} = useLocalStorage();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTaskList = {
            ...taskList,
            tasks: [
                ...(taskList.tasks ?? []),
                {id: nextTaskId, content: taskName}
            ]
        };

        setNextTaskId(nextTaskId + 1)
        saveNextId(nextTaskId + 1);
        setTaskList(newTaskList);
        saveList(newTaskList, listType);
        setTaskName('');
    }

    return (
        <form className="form-group" onSubmit={onSubmit}>
            <TextInput
                name={`${listType}-task-input`}
                id={`${listType}-task-input`}
                value={taskName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {setTaskName(e.currentTarget.value)}}
                autoComplete="off"
                placeholder="Task"
                label="Task name"
                required
            />
            {/* Todo: fix that this is stretched */}
            <button className="add-button" type="submit">Add</button>
        </form>
    );
};