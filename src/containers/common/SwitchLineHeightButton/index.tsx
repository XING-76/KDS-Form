import { layoutConfigs } from '@configs/layoutConfigs';
import { SET_GLOBAL_STYLE } from '@containers/common/model';
import { storesType } from '@containers/reducers';
import Button from '@modules/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LineHeightButton = () => {
    const dispatch = useDispatch();
    const commonState = useSelector((state: storesType) => ({ ...state.common }));
    const { globalStyle } = commonState;
    const isContentShrink = globalStyle.lineHeight === 'tight';
    const handleToggleLineHeight = () => {
        if (isContentShrink) {
            document.documentElement.style.setProperty('--custom-row-padding', layoutConfigs.LINE_HEIGHT.loose);
            dispatch(SET_GLOBAL_STYLE({ ...globalStyle, lineHeight: 'loose' }));
        }
        if (!isContentShrink) {
            document.documentElement.style.setProperty('--custom-row-padding', layoutConfigs.LINE_HEIGHT.tight);
            dispatch(SET_GLOBAL_STYLE({ ...globalStyle, lineHeight: 'tight' }));
        }
    };

    return (
        <Button color="secondary" onClick={handleToggleLineHeight}>
            {isContentShrink ? '寬鬆' : '緊縮'}
        </Button>
    );
};

export default LineHeightButton;
