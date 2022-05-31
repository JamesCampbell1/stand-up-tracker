export type ListType = 'yesterday' | 'today' | 'blocker';

export interface TaskListModel {
    title: string;
    tasks: TaskModel[];
}

export interface TaskModel {
    id: number;
    content: string;
}