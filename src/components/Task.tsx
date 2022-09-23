import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ListType, TaskModel } from '../types';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface Props {
    task: TaskModel;
    index: number;
    deleteTask: (index: number) => TaskModel[];
    listType: ListType;
}

const getTaskStyle = ({isDragging}: DraggableStateSnapshot, {draggableProps}: DraggableProvided) => ({
    ...(isDragging ? 
        {background: '#377073', border: '2px dashed #47D1DA', margin: '10px auto'} : 
        {}
    ),
    // styles we need to apply on draggables
    ...draggableProps.style,
});

export const Task = ({ task, index, deleteTask, listType}: Props) => {
    return (
        <Draggable draggableId={`${listType}-${task.id}`} index={index}>
            {
                (provided, snapshot) => (
                    <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="task"
                        style={getTaskStyle(snapshot, provided)}
                    >
                        <span className="task-title">
                            {task.content}
                        </span>
                        <div className="delete-button-container">   
                            <button className="danger icon-button" onClick={() => deleteTask(index)}>
                                <RiDeleteBin6Line className="icon" />
                            </button>
                        </div>
                    </li>
                )
            }
        </Draggable>
    );
};