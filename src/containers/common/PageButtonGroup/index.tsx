import Grid from '@modules/Grid';
import React from 'react';
import './style.scss';

type Props = {
    className?: string;
    children?: React.ReactNode;
};

const PageButtonGroup = (props: Props) => {
    const { className = '', children } = props;
    return <Grid className={`pageButtonGroup ${className}`}>{children}</Grid>;
};

export default PageButtonGroup;
