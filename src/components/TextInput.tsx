import React from 'react';

interface Props {
    name: string;
    id: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    autoComplete?: string | undefined;
    placeholder?: string | undefined;
    label: string;
    required?: boolean;
}

export const TextInput = (props: Props) => {
    return (
        // Todo: give this a class
        <div style={{width: '100%', position: 'relative', padding: '15px 0 0'}}>
            <input 
                type="text" 
                className="form-field"
                {...props}
            />
            <label htmlFor={props.id} className="form-label">{props.label}</label>
        </div>
    );
};