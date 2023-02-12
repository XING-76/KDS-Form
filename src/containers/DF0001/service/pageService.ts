import { SearchResultTableTitle } from '@containers/common/model/types';
import { getInitTableTitleStatus } from '@containers/common/utils/tableUtils';
import { PageRoutes } from '../model/types';

export const initPageRoutes: PageRoutes = {
    pageButtonGroup: {
        isDisplay: true,
        isExpand: true
    },
    searchForm: {
        isDisplay: false,
        isExpand: true
    },
    addForm: {
        isDisplay: false,
        isExpand: true
    },
    searchResult: {
        isDisplay: false
    }
};

export const initSearchTitlesTextAndCodeMap = [
    { titleText: '名', titleCode: 'firstName' },
    { titleText: '姓', titleCode: 'lastName' },
    { titleText: '年齡', titleCode: 'age' },
    { titleText: '性別', titleCode: 'gender' },
    { titleText: '生日', titleCode: 'birthDate' }
];

export const initSearchResultTableTitle: Array<SearchResultTableTitle> = getInitTableTitleStatus(
    initSearchTitlesTextAndCodeMap,
    'discardFunctionalColumn'
);

const chinese = /[\u4E00-\u9FA5]/g;

export const replaceChinese = (str: string) => {
    const result = str.replace(chinese, '');
    return result;
};
