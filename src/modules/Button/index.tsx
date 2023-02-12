import * as React from 'react';
import './style.scss';

interface Props {
    color?: string;
    className?: string;
    borderRadius?: string;
    disabled?: boolean;
    children?: string;
    onBlur?: Function;
    onClick?: Function;
    onFocus?: Function;
    onKeyDown?: Function;
    onKeyUp?: Function;
    onMouseDown?: Function;
    onMouseLeave?: Function;
    onMouseUp?: Function;
    onTouchEnd?: Function;
    onTouchMove?: Function;
    onTouchStart?: Function;
    onDragLeave?: Function;
    dataStopProp?: string;
}

const Button: React.FC<any> = (props: Props) => {
    const {
        dataStopProp,
        color = 'default',
        className = '',
        borderRadius = 'sm',
        disabled = false,
        children,
        onBlur,
        onClick,
        onFocus,
        onKeyDown,
        onKeyUp,
        onMouseDown,
        onMouseLeave,
        onMouseUp,
        onTouchEnd,
        onTouchMove
    } = props;

    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick(event);
    };

    const handleOnBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
        if (onBlur) onBlur(event);
    };

    const handleOnFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        if (onFocus) onFocus(event);
    };

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (onKeyUp) {
            onKeyUp(event);
        }
    };

    const handleOnMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onMouseDown) {
            onMouseDown(event);
        }
    };

    const handleOnMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onMouseLeave) {
            onMouseLeave(event);
        }
    };

    const handleOnMouseUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onMouseUp) {
            onMouseUp(event);
        }
    };

    const handleOnTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
        if (onTouchEnd) {
            onTouchEnd(event);
        }
    };

    const handleOnTouchMove = (event: React.TouchEvent<HTMLButtonElement>) => {
        if (onTouchMove) onTouchMove(event);
    };

    return (
        <button
            draggable={false}
            data-stop-prop={dataStopProp}
            className={`button-${color} borderRadius-${borderRadius} ${className}`}
            onClick={handleOnClick}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            onKeyUp={handleKeyUp}
            onKeyDown={handleOnKeyDown}
            onMouseDown={handleOnMouseDown}
            onMouseLeave={handleOnMouseLeave}
            onMouseUp={handleOnMouseUp}
            onTouchEnd={handleOnTouchEnd}
            onTouchMove={handleOnTouchMove}
            disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
