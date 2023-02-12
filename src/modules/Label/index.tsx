import React from 'react';
import './style.scss';

type Props = {
    className?: string;
    onClick?: Function;
    htmlFor?: string;
    children?: React.ReactNode;
    required?: boolean;
};

const Label = (props: Props) => {
    const { htmlFor, className = '', children, onClick, required = false } = props;

    const handleOnClick = (event: React.MouseEvent<HTMLLabelElement>) => {
        if (onClick) onClick(event);
    };

    return (
        <label htmlFor={htmlFor} className={`label ${required ? 'required' : ''}${className}`} onClick={handleOnClick}>
            {children}
        </label>
    );
};

export default Label;
