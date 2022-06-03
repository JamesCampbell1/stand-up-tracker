import { ListType, TaskListModel } from "../types";

export const useLocalStorage = () => {
    
    const nextIdKey = 'nextId';

    const saveList = (list: TaskListModel, listType: ListType) => {
        const listString = JSON.stringify(list);
        localStorage.setItem(listType, listString);
    }

    const getList = (listType: ListType) => {
        const listString = localStorage.getItem(listType);
        return JSON.parse(listString ?? `{"title": "${listType}", "tasks": []}`);
    }

    const saveNextId = (nextId: number) => localStorage.setItem(nextIdKey, nextId.toString());

    const getNextId = () => localStorage.getItem(nextIdKey);

    return {
        saveList,
        getList,
        saveNextId,
        getNextId
    }
};