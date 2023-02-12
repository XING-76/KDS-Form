import { storesType } from '@containers/reducers';
import * as React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

interface Props {
    className?: string;
    onClick?: Function;
    children?: string;
    row?: boolean;
    col?: boolean;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
}

const Grid: React.FC<any> = (props: Props) => {
    const commonState = useSelector((state: storesType) => ({ ...state.common }));
    const { sidebarStatus } = commonState;

    const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const element = event.target as HTMLDivElement;
        if (element.getAttribute('data-stop-prop')) return;
        if (onClick) onClick(event);
    };

    const { className = '', children, onClick, row = false, col = false, xs, sm, md, lg, xl, xxl } = props;
    const gridRow = row ? 'grid__row' : '';
    const gridCol = col ? 'grid__col' : '';
    const menuStatus = sidebarStatus.isOpen ? 'sidebarOpen' : '';

    const colXs = xs ? `grid__colxs_${xs}` : '';
    const colSm = xs ? `grid__colsm_${sm}` : '';
    const colMd = xs ? `grid__colmd_${md}` : '';
    const colLg = xs ? `grid__collg_${lg}` : '';
    const colXl = xs ? `grid__colxl_${xl}` : '';
    const colXxl = xs ? `grid__colxxl_${xxl}` : '';

    return (
        <div
            onClick={handleOnClick}
            className={`${gridRow} ${gridCol} ${colXs} ${colSm} ${colMd} ${colLg} ${colXl} ${colXxl} ${menuStatus} ${className}`}>
            {children}
        </div>
    );
};

export default Grid;
