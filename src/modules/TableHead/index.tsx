import React from 'react';
import './style.scss';

interface Props {
    className?: string;
    children?: string;
}

const TableHead: React.FC<any> = (props: Props) => {
    const { className = '', children } = props;

    return <div className={`table__header ${className} `}>{children}</div>;
};

export default TableHead;
