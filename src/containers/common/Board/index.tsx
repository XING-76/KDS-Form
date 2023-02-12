import Icon from '@modules/Icon';
import Loading from '@modules/Loading';
import React from 'react';
import './style.scss';
import TitleFunctionalButtons from './TitleFunctionalButtons';

interface Props {
    id?: string;
    titlePosition?: string;
    boardStyle?: string;
    className?: string;
    icons?: Array<string>;
    onClick?: Function;
    title?: string;
    content?: string;
    children?: React.ReactNode;
    isShowExpandIcon?: boolean;
    isContentShow?: boolean;
    handleToggleExpand?: Function;
    handleCancel?: Function;
    handleZoomOut?: Function;
    isTitleSticky?: boolean;
    currenEditDataRowNumber?: number;
    handleClickDataSwitch?: (event: React.MouseEvent) => void;
    isLastEditableNo?: { left: boolean; right: boolean };
    isShowToggleLineHeightButton?: boolean;
    isShowDataSwitch?: boolean;
    isShowUnderline?: boolean;
    isRender?: boolean;
}

const Board: React.FC<Props> = (props: Props) => {
    const {
        id = '',
        titlePosition = 'center',
        boardStyle = '',
        title = '',
        className = '',
        icons = [],
        isShowExpandIcon = true,
        children,
        handleCancel,
        handleZoomOut,
        isContentShow = true,
        handleToggleExpand,
        isTitleSticky,
        currenEditDataRowNumber,
        handleClickDataSwitch,
        isLastEditableNo,
        isShowToggleLineHeightButton = false,
        isShowDataSwitch = false,
        isShowUnderline,
        isRender
    } = props;

    const handleClickExpandIcon = () => {
        if (handleToggleExpand) handleToggleExpand();
    };

    const iconHandlerMap: Record<string, Function> = {
        close: handleCancel as Function,
        zoomOut: handleZoomOut as Function
    };

    /**
     * 是否顯示loading畫面
     * @returns
     */
    const isShowLoading = () => {
        if (isRender === undefined) return false;
        return !isRender;
    };

    return (
        <div className={`board__wrapper ${isContentShow ? '' : 'content__hidden'} ${boardStyle} ${className}`} id={id}>
            <div className={`${isTitleSticky ? 'sticky' : ''}`}>
                <div
                    className={`board__title ${titlePosition} ${isShowExpandIcon ? 'expandable' : ''} `}
                    onClick={handleClickExpandIcon}>
                    <div className="board__title_text">{title}</div>
                    <div className="board__icons">
                        {icons.map((icon, index) => {
                            return (
                                <span
                                    key={index}
                                    className={`icon icon_${icon}`}
                                    onClick={() => iconHandlerMap[icon]()}>
                                    <Icon icon={icon} />
                                </span>
                            );
                        })}

                        {isShowExpandIcon ? (
                            <span className={`icon icon__expand ${isContentShow ? 'expandContent' : ''}`}>
                                <Icon icon="expand" />
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <TitleFunctionalButtons
                    currenEditDataRowNumber={currenEditDataRowNumber}
                    handleClickDataSwitch={handleClickDataSwitch}
                    isLastEditableNo={isLastEditableNo}
                    isShowToggleLineHeightButton={isShowToggleLineHeightButton}
                    isShowDataSwitch={isShowDataSwitch}
                    isContentShow={isContentShow}
                    isShowUnderline={isShowUnderline}
                />
            </div>
            <div className={`board__content`}>
                {isShowLoading() ? <Loading /> : <></>}
                {children}
            </div>
        </div>
    );
};

export default Board;
