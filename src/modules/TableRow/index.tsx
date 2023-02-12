import React from 'react';
import './style.scss';

interface Props {
    className?: string;
    children?: string;
    color?: string;
    onClick?: Function;
    sticky?: boolean;
}

const TableRow: React.FC<any> = (props: Props) => {
    const { className = '', onClick, children, sticky } = props;

    const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const element = event.target as Element;

        if (element.getAttribute('data-stop-prop')) {
            return;
        }
        if (onClick) onClick(event);
    };

    return (
        <div className={`table__row ${className} ${sticky ? 'table__row_sticky' : ''}`} onClick={handleOnClick}>
            {children}
        </div>
    );
};

export default TableRow;
