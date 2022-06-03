import { Draggable } from 'react-beautiful-dnd';
import { ListType, TaskModel } from '../types';
import { DeleteIcon } from './DeleteIcon';

interface Props {
    task: TaskModel;
    index: number;
    deleteTask: (index: number) => TaskModel[];
    listType: ListType;
}

export const Task = ({ task, index, deleteTask, listType}: Props) => {
    return (
        <Draggable draggableId={`${listType}-${task.id}`} index={index}>
            {
                provided => (
                    <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <span className="task-title">
                            {task.content}
                        </span>
                        <div className="delete-button-container">   
                            <button className="danger icon-button" onClick={() => deleteTask(index)}><DeleteIcon /></button>
                        </div>
                    </li>
                )
            }
        </Draggable>
    );
};