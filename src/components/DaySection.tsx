import { ListType, TaskListModel } from "../types";
import { ColumnHeader } from "./ColumnHeader";
import { TaskInput } from "./TaskInput";
import { TaskList } from "./TaskList";

interface Props {
    taskList: TaskListModel;
    setTaskList: React.Dispatch<React.SetStateAction<null |TaskListModel>>;
    otherTaskList: TaskListModel;
    setOtherTaskList: React.Dispatch<React.SetStateAction<null |TaskListModel>>;
    listType: ListType;
}

export const DaySection = ({ taskList, setTaskList, listType }: Props) => {
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