import * as React from 'react';
import './style.scss';

const Icon: React.FC<any> = (props) => {
    const { icon, className = '', onClick, id, dataStopProp, onMouseOver } = props;

    const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
        if (onClick) onClick(event);
    };

    const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
        if (onMouseOver) onMouseOver(event);
    };

    return (
        <span
            data-stop-prop={dataStopProp}
            className={`kangda__icon_${icon} ${className}`}
            onMouseOver={handleMouseOver}
            onClick={handleOnClick}
            id={id}></span>
    );
};

export default Icon;
