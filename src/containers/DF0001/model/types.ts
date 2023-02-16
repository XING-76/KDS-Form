import { BlockStatus } from '@containers/common/model/types';

export type PageRoutes = {
    pageButtonGroup: BlockStatus;
    searchForm: BlockStatus;
    addForm: BlockStatus;
    searchResult: BlockStatus;
};

export interface SearchFormField {
    limit: string;
}

export interface AddFormField {
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    birthDate: string;
}

export interface SearchResultData {
    id: string;
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    birthDate: string;
    function: Array<string>;
}

export interface ApiStatus {
    type: string;
    code: number;
    dataId?: string;
    data?: string;
    mode?: string;
}

export interface State {
    globalStyle: {
        lineHeight: string;
        fontSize: string;
        themeColor: string;
    };
    searchFormField: SearchFormField;
    addFormField: AddFormField;
    loadingState: boolean;
    searchResult: Array<SearchResultData>;
    apiStatus: ApiStatus;
}
