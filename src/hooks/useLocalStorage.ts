import { ListType } from "../types";

export const useLocalStorage = () => {
    
    const saveList = (list: string[], listType: ListType) => {
        const listString = JSON.stringify(list);
        localStorage.setItem(listType, listString);
    }

    const getList = (listType: ListType) => {
        const listString = localStorage.getItem(listType);
        return JSON.parse(listString ?? '[]');
    }

    return {
        saveList,
        getList
    }
};