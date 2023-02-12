import Grid from '@modules/Grid';
import Icon from '@modules/Icon';
import React from 'react';
import './style.scss';

type Props = {
    onClick?: Function;
    pageName: string;
    className?: string;
};

const PageButton = ({ onClick, pageName, className = '' }: Props) => {
    const handleClick = (event: React.MouseEvent) => {
        if (onClick) onClick(event);
    };

    return (
        <Grid col xs="12" sm="12" md="4" lg="4" xl="3" xxl="3" className={`pageButtonGroup ${className}`}>
            <div className="pageButton" onClick={(event) => handleClick(event)}>
                <span>{pageName}</span>
                <Icon icon="play" className="arrow_icon" />
            </div>
        </Grid>
    );
};

export default PageButton;
