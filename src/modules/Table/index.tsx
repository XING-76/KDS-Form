import React from 'react';
import './style.scss';

interface Props {
    className?: string;
    children?: string;
}

const Table: React.FC<any> = (props: Props) => {
    const { className = '', children } = props;

    return (
        <div className="table__wrapper">
            <div className="table__scroll">
                <div className={`table ${className}`}>{children}</div>
            </div>
        </div>
    );
};

export default Table;
