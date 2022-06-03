import { ListType, TaskListModel } from "../types";
import { ColumnHeader } from "./ColumnHeader";
import { TaskInput } from "./TaskInput";
import { TaskList } from "./TaskList";

interface Props {
    taskList: TaskListModel;
    setTaskList: React.Dispatch<React.SetStateAction<TaskListModel>>;
    listType: ListType;
    nextTaskId: number;
    setNextTaskId: React.Dispatch<React.SetStateAction<number>>;
}

export const DaySection = ({ taskList, setTaskList, listType, nextTaskId, setNextTaskId }: Props) => {
    return (
        <div className="section">
            <div className="section-header">
                <ColumnHeader title={listType} />
            </div>
            <div className="content">
                <TaskInput
                    taskList={taskList}
                    setTaskList={setTaskList}
                    listType={listType}
                    nextTaskId={nextTaskId}
                    setNextTaskId={setNextTaskId}
                />
                <TaskList 
                    taskList={taskList} 
                    setTaskList={setTaskList}
                    listType={listType}
                />
            </div>
        </div>
    );
};