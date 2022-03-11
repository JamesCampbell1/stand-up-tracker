import React from 'react';

interface Props {
    title: string;
}

export const ColumnHeader = ({ title }: Props) => {
    return (
        <div className="section">
            <h2>{title}</h2>
        </div>
    );
};