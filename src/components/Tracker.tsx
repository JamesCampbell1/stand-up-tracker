import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TaskListModel } from '../types';
import { ColumnHeader } from './ColumnHeader';
import { DaySection } from './DaySection';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';

export const Tracker = () => {

    const {getList} = useLocalStorage();

    const [yesterdayTaskList, setYesterdayTaskList] = useState<TaskListModel | null>(null);
    const [todayTaskList, setTodayTaskList] = useState<TaskListModel | null>(null);
    const [blockerTaskList, setBlockerTaskList] = useState<TaskListModel | null>(null);

    useEffect(() => {
        setYesterdayTaskList(getList('yesterday'));
        setTodayTaskList(getList('today'));
        setBlockerTaskList(getList('blocker'));
    }, []);

    return (
        <div className="layout-grid">
            {
                // Todo: display a loader while getting task lists
                yesterdayTaskList && todayTaskList && blockerTaskList &&
                <>
                    <DaySection
                        taskList={yesterdayTaskList} 
                        setTaskList={setYesterdayTaskList}
                        otherTaskList={todayTaskList}
                        setOtherTaskList={setTodayTaskList}
                        listType="yesterday"
                    />

                    <DaySection
                        taskList={todayTaskList} 
                        setTaskList={setTodayTaskList}
                        otherTaskList={yesterdayTaskList}
                        setOtherTaskList={setYesterdayTaskList}
                        listType="today"
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
                            />
                            <TaskList 
                                taskList={blockerTaskList} 
                                setTaskList={setBlockerTaskList}
                                listType="blocker"
                            />
                        </div>
                    </div>

                </>
            }
        </div>
    );
};