import SwitchLineHeightButton from '@containers/common/SwitchLineHeightButton';
import ButtonWrapper from '@modules/ButtonWrapper';
import DataSwitch from '@modules/DataSwitch';
import React from 'react';

interface Props {
    currenEditDataRowNumber?: number;
    handleClickDataSwitch?: (event: React.MouseEvent) => void;
    isLastEditableNo?: { left: boolean; right: boolean };
    isShowToggleLineHeightButton?: boolean;
    isShowDataSwitch?: boolean;
    isContentShow?: boolean;
    isShowUnderline?: boolean;
}

const TitleFunctionalButtons = (props: Props) => {
    const {
        currenEditDataRowNumber,
        handleClickDataSwitch,
        isLastEditableNo,
        isShowToggleLineHeightButton = true,
        isShowDataSwitch = false,
        isContentShow = true,
        isShowUnderline = false
    } = props;

    const isShowContentTitle = isShowDataSwitch || isShowToggleLineHeightButton;

    return (
        <>
            {isShowContentTitle && (
                <div className={`content__title grey ${isShowUnderline && 'content__title_underline hideBorder'}`}>
                    <ButtonWrapper buttonPosition={`${isShowDataSwitch ? 'spaceBetween' : 'right'}`}>
                        {isShowDataSwitch && (
                            <DataSwitch
                                currenEditDataRowNumber={currenEditDataRowNumber as number}
                                handleClickDataSwitch={handleClickDataSwitch as (event: React.MouseEvent) => void}
                                isLastEditableNo={isLastEditableNo}
                            />
                        )}
                        {isShowToggleLineHeightButton && isContentShow && <SwitchLineHeightButton />}
                    </ButtonWrapper>
                </div>
            )}
        </>
    );
};

export default TitleFunctionalButtons;
