import { ListType } from "../types";
import { ColumnHeader } from "./ColumnHeader";
import { TaskInput } from "./TaskInput";
import { TaskList } from "./TaskList";

interface Props {
    taskList: [] | string[];
    setTaskList: React.Dispatch<React.SetStateAction<[] | string[]>>;
    otherTaskList: [] | string[];
    setOtherTaskList: React.Dispatch<React.SetStateAction<[] | string[]>>;
    listType: ListType;
}

export const DaySection = ({ taskList, setTaskList, otherTaskList, setOtherTaskList, listType }: Props) => {
    return (
        <div className="section">
            <div>
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
                    otherTaskList={otherTaskList}
                    setOtherTaskList={setOtherTaskList}
                    listType={listType}
                />
            </div>
        </div>
    );
};