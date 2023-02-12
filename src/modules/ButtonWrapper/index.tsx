import React from 'react';
import './style.scss';

interface Props {
    children: React.ReactNode;
    className?: string;
    buttonPosition?: string;
}
const ButtonWrapper = (props: Props) => {
    const { children, className = '', buttonPosition = 'center' } = props;

    return <div className={`buttonWrapper ${buttonPosition} ${className}`}>{children}</div>;
};

export default ButtonWrapper;
