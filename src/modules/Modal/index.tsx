import ObjectUtils from '@utils/objectUtils';
import React, { ReactNode } from 'react';
import './style.scss';

type Props = {
    children: ReactNode;
    isFixedHeight?: boolean;
    handleCancel?: Function;
    className?: string;
};

const Modal = ({ children, isFixedHeight, handleCancel, className }: Props) => {
    const [mouseDownElement, setMouseDownElement] = React.useState<Element | null>(null);
    // const notFound = -1;

    const handleClickBackDrop = () => {
        setMouseDownElement(null);
        // if (!ObjectUtils.isExist(mouseDownElement)) handleCancel ? handleCancel() : '';
        if (!ObjectUtils.isExist(mouseDownElement)) (handleCancel as Function)();
    };

    const handleClickInsideModal = (event: React.MouseEvent) => event.stopPropagation();

    const handleMouseDown = (event: React.MouseEvent) => {
        setMouseDownElement(event.target as Element);
    };

    /**
     * 判斷滑鼠放開時的位置是否在modal__wrapper內
     */
    const handleMouseUp = () => {
        const modalElement = document.querySelector('.modal__wrapper');

        if (!ObjectUtils.isExist(mouseDownElement))
            if (!modalElement?.contains(mouseDownElement) && mouseDownElement?.className?.includes('modal__backdrop')) {
                // handleCancel ? handleCancel() : '';
                (handleCancel as Function)();
            }

        setMouseDownElement(null);
    };

    return (
        <div className="modal__backdrop" onClick={handleClickBackDrop}>
            <div
                className={`modal__wrapper ${isFixedHeight && 'fixedHeight'} ${className}`}
                onClick={handleClickInsideModal}
                onMouseUp={handleMouseUp}
                onMouseDown={handleMouseDown}>
                {children}
            </div>
        </div>
    );
};
export default Modal;
