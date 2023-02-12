import Icon from '@modules/Icon';
import React from 'react';
import './style.scss';

interface Props {
    handleClickDataSwitch: (event: React.MouseEvent) => void;
    currenEditDataRowNumber: number;
    isLastEditableNo?: { left: boolean; right: boolean };
}

const DataSwitch = (props: Props) => {
    const { handleClickDataSwitch, currenEditDataRowNumber, isLastEditableNo } = props;

    return (
        <div className="dataSwitch__wrapper" onClick={handleClickDataSwitch}>
            <Icon id="arrowLeft" icon="expand" className={`arrowLeft ${isLastEditableNo?.left && 'lastEditable'}`} />
            <div>第 {currenEditDataRowNumber} 筆</div>
            <Icon id="arrowRight" icon="expand" className={`arrowRight ${isLastEditableNo?.right && 'lastEditable'}`} />
        </div>
    );
};

export default DataSwitch;
