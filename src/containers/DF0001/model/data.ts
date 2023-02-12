import { ApiStatus, SearchFormField, State } from './types';

export const searchFormField: SearchFormField = {
    limit: ''
};

export const initStatus: ApiStatus = {
    type: '',
    code: 0,
    dataId: '',
    data: '',
    mode: 'view'
};

export const initialState: State = {
    globalStyle: {
        lineHeight: 'loose',
        fontSize: 'medium',
        themeColor: 'normal'
    },
    searchFormField,
    searchResult: [],
    apiStatus: initStatus,
    loadingState: false
};
