import ObjectUtils from '@utils/objectUtils';
import React from 'react';
import './style.scss';

interface Props {
    className?: string;
    children?: string;
    grow?: number;
    title?: string;
    dataStopProp?: string;
    onClick?: Function;
    contentType?: string;
    id?: string;
    isResizeHandleShow?: true;
    tableHeight?: number;
    isInsideModal?: boolean;
}

const TableCell: React.FC<any> = (props: Props) => {
    const {
        className = '',
        onClick,
        children,
        dataStopProp,
        grow,
        contentType = '',
        id,
        isResizeHandleShow,
        tableHeight,
        isInsideModal = false
    } = props;
    const [currentResizeColumn, setCurrentResizeColumn] = React.useState(null as any);
    const [originalColumnWidth, setOriginalColumnWidth] = React.useState({
        targetElement: null as any,
        adjacentElement: null as any
    });
    const [isResizeTargetCell, setIsResizeTargetCell] = React.useState(false);
    const isFirstRender = React.useRef(true);
    const tableElement = document.querySelector(
        `${isInsideModal ? '.modal__wrapper .table__wrapper' : '.table__wrapper'}`
    ) as HTMLDivElement;

    const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const element = event.target as Element;

        if (element.getAttribute('data-stop-prop')) return;
        if (onClick) onClick(event);
    };

    const handleMouseDown = (id: string) => {
        setCurrentResizeColumn(id);

        const targetElement = (
            document.querySelector<HTMLDivElement>(`[data-column-id="${id}"]`) as HTMLElement
        ).querySelector<HTMLDivElement>('#container') as HTMLElement;
        const adjacentElement = (
            (targetElement.parentNode as HTMLElement).nextElementSibling as HTMLElement
        ).querySelector<HTMLElement>('#container') as HTMLElement;

        setOriginalColumnWidth({
            targetElement: targetElement.offsetWidth,
            adjacentElement: adjacentElement.offsetWidth
        });
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (currentResizeColumn !== id) return;

        const minWidth = 40;
        const targetCells = document.querySelectorAll<HTMLDivElement>(`[data-column-id="${id}"]`);
        const { left: targetCellLeftPosition } = targetCells[0].getBoundingClientRect();

        const targetNewWidth = event.clientX - targetCellLeftPosition;

        const targetWidthShift = targetNewWidth - originalColumnWidth.targetElement;

        const adjacentNewWidth = originalColumnWidth.adjacentElement - targetWidthShift;
        if (targetNewWidth < minWidth || adjacentNewWidth < minWidth) return;

        targetCells.forEach((element) => {
            const targetElement = element.querySelector<HTMLDivElement>('#container') as HTMLElement;
            const adjacentElement = (
                (targetElement.parentNode as HTMLDivElement).nextElementSibling as HTMLDivElement
            ).querySelector<HTMLElement>('#container') as HTMLDivElement;

            targetElement.style.width = `${targetNewWidth}px`;
            adjacentElement.style.width = `${adjacentNewWidth}px`;
        });
    };

    const removeListeners = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
        setCurrentResizeColumn(null);
        removeListeners();
    };

    React.useEffect(() => {
        if (ObjectUtils.isExist(currentResizeColumn)) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            removeListeners();
        };
    }, [currentResizeColumn, handleMouseMove, handleMouseUp, removeListeners]);

    React.useEffect(() => {
        const allTableCells = document.querySelectorAll<HTMLDivElement>('.table__cell_childrenContainer');

        allTableCells.forEach((element) => {
            element.style.width = '';
        });
    }, []);

    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // 修正 Cannot read property 'style' of null
        if (tableElement) {
            if (currentResizeColumn === id) {
                tableElement.style.userSelect = 'none';
                tableElement.style.pointerEvents = 'none';
                return setIsResizeTargetCell(true);
            }

            tableElement.style.userSelect = 'auto';
            tableElement.style.pointerEvents = 'auto';
        }

        setIsResizeTargetCell(false);
    }, [currentResizeColumn]);

    return (
        <div
            className={`table__cell${grow ? ` flex-grow-${grow}` : ''}${
                contentType ? ` table__cell_${contentType}` : ''
            } ${className} ${id}`}
            onClick={handleOnClick}
            data-stop-prop={dataStopProp}
            data-column-id={id}
            id={id}>
            <div className="table__cell_childrenContainer" id="container">
                {children}
            </div>
            {isResizeHandleShow && (
                <div
                    style={{ height: tableHeight }}
                    className={`resize-handle ${isResizeTargetCell ? 'showHighlight' : ''}`}
                    onMouseDown={() => handleMouseDown(id as string)}
                />
            )}
        </div>
    );
};

export default TableCell;
