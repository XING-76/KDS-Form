import React from 'react';
import './style.scss';

interface Props {
    className?: string;
    // children: Array<object>;
    children: JSX.Element[];
    noDataText?: string;
}

const TableBody: React.FC<any> = (props: Props) => {
    const { className = '', noDataText = '無資料', children } = props;

    return (
        <div className={`table__body ${children.length === 0 ? 'noData' : ''} ${className}`}>
            {children.length === 0 && `${noDataText}`}
            {children}
        </div>
    );
};

export default TableBody;
