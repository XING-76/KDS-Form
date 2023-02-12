import { BlockStatus, PageRoutes, StatusModalTypes } from '../model/types';
import { openStatusModal } from './modalUtils';

/**
 * 處理 board 開合
 * @param setPageRoutes
 * @param currentPageRoutes
 * @param target
 */
export const handleClickExpand = (setPageRoutes: Function, currentPageRoutes: PageRoutes, target: keyof PageRoutes) => {
    if (target)
        setPageRoutes({
            ...currentPageRoutes,
            [target]: {
                ...(currentPageRoutes[target] as BlockStatus),
                isExpand: !(currentPageRoutes[target] as BlockStatus).isExpand
            }
        });
};

/**
 * 查詢成功時，關閉 pageButtonGroup 、查詢表單、顯示查詢列表
 * @param setPageRoutes
 * @param initPageRoutes
 */
export const handleRefreshSearchPage = (
    setPageRoutes: Function,
    initPageRoutes: PageRoutes,
    isRemainOpenSearchFrom: 'remainSearchForm' | 'collapseSearchForm' = 'collapseSearchForm'
) => {
    setPageRoutes((PageRoutes: PageRoutes) => {
        const isExpandSearchForm = isRemainOpenSearchFrom === 'remainSearchForm';
        return {
            ...initPageRoutes,
            pageButtonGroup: {
                ...initPageRoutes.pageButtonGroup,
                isExpand: false
            },
            searchForm: {
                ...PageRoutes.searchForm,
                // ...(isExpandSearchForm
                //     ? { isExpand: true }
                //     : { isExpand: (PageRoutes.searchForm as BlockStatus).isExpand }),
                isExpand: isExpandSearchForm,
                isDisplay: true
            },
            searchResult: {
                ...PageRoutes.searchResult,
                isDisplay: true
            }
        };
    });
};

/**
 * 主畫面重新整理，剛進到作業時的顯示
 * @param setPageRoutes
 * @param initPageRoutes
 */
export const handleRefreshMainPage = (setPageRoutes: Function, initPageRoutes: PageRoutes) => {
    setPageRoutes({
        ...initPageRoutes,
        searchForm: {
            isDisplay: true,
            isExpand: true
        }
    });
};

export const handleCheckCurrentOnCheckedAmount = (
    currentOnCheckedAmount: number,
    amountThreshold: number,
    dispatch: Function
) => {
    let isCheckPass = true;
    if (currentOnCheckedAmount < amountThreshold) {
        dispatch(openStatusModal(StatusModalTypes.WARNING, `請至少勾選 ${amountThreshold} 筆`));
        isCheckPass = false;
    }

    return isCheckPass;
};
