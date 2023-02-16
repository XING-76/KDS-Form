import Board from '@containers/common/Board';
import PageButton from '@containers/common/PageButton';
import PageButtonsGroup from '@containers/common/PageButtonGroup';
import { handleClickExpand } from '@containers/common/utils/uiFlowUtils';
import React from 'react';
import { PageRoutes } from '../model/types';
import { initPageRoutes } from '../service/pageService';

type Props = {
    setPageRoutes: React.Dispatch<React.SetStateAction<PageRoutes>>;
    pageRoutes: PageRoutes;
};

const PageButtonGroup = (props: Props) => {
    const { setPageRoutes, pageRoutes } = props;

    const changePageRoute = (route: keyof PageRoutes) => {
        setPageRoutes({
            ...initPageRoutes,
            [route]: {
                isExpand: true,
                isDisplay: true
            },
            pageButtonGroup: {
                ...pageRoutes.pageButtonGroup,
                isExpand: false
            }
        });
    };

    const scrollToTargetForm = (route: keyof PageRoutes) => {
        const element = document.getElementById(route);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    const handleClickCard = (event: React.MouseEvent, route: keyof PageRoutes) => {
        event.preventDefault();
        changePageRoute(route);
        scrollToTargetForm(route);
    };

    return (
        <Board
            title="示例表格"
            handleToggleExpand={() => handleClickExpand(setPageRoutes, pageRoutes, 'pageButtonGroup')}
            isContentShow={pageRoutes.pageButtonGroup.isExpand}
            boardStyle="grey">
            <PageButtonsGroup>
                <PageButton
                    className={pageRoutes.searchForm.isDisplay ? 'active' : ''}
                    onClick={(event: React.MouseEvent) => handleClickCard(event, 'searchForm')}
                    pageName="查詢用戶"
                />
                <PageButton
                    className={pageRoutes.addForm.isDisplay ? 'active' : ''}
                    onClick={(event: React.MouseEvent) => handleClickCard(event, 'addForm')}
                    pageName="新增用戶"
                />
            </PageButtonsGroup>
        </Board>
    );
};
export default PageButtonGroup;
