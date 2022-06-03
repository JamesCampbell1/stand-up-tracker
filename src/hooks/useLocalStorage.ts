import { ListType, TaskListModel } from "../types";

export const useLocalStorage = () => {
    
    const saveList = (list: TaskListModel, listType: ListType) => {
        const listString = JSON.stringify(list);
        localStorage.setItem(listType, listString);
    }

    const getList = (listType: ListType) => {
        const listString = localStorage.getItem(listType);
        return JSON.parse(listString ?? `{"title": "${listType}", "tasks": []}`);
    }

    return {
        saveList,
        getList
    }
};