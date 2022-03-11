import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ColumnHeader } from './ColumnHeader';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';

export const Tracker = () => {

    const {getList} = useLocalStorage();

    const [yesterdayTaskList, setYesterdayTaskList] = useState<string[] | []>([]);
    const [todayTaskList, setTodayTaskList] = useState<string[] | []>([]);

    useEffect(() => {
        setYesterdayTaskList(getList('yesterday'));
        setTodayTaskList(getList('today'));
    }, []);

    return (
        <div className="layout-grid">

            <div className="section">
                <div>
                    <ColumnHeader title="Yesterday" />
                </div>
                <div className="content">
                    <TaskInput 
                        taskList={yesterdayTaskList}
                        setTaskList={setYesterdayTaskList}
                        listType="yesterday"
                    />
                    <TaskList 
                        taskList={yesterdayTaskList} 
                        setTaskList={setYesterdayTaskList}
                        otherTaskList={todayTaskList}
                        setOtherTaskList={setTodayTaskList}
                        listType="yesterday"
                    />
                </div>
            </div>

            <div className="section">
                <div>
                    <ColumnHeader title="Today" />
                </div>
                <div className="content">
                    <TaskInput 
                        taskList={todayTaskList} 
                        setTaskList={setTodayTaskList} 
                        listType="today"
                    />
                    <TaskList 
                        taskList={todayTaskList} 
                        setTaskList={setTodayTaskList}
                        otherTaskList={yesterdayTaskList}
                        setOtherTaskList={setYesterdayTaskList}
                        listType="today"
                    />
                </div>
            </div>
        </div>
    );
};