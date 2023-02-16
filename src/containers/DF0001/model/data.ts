import { ApiStatus, SearchFormField, State } from './types';

export const searchFormField: SearchFormField = {
    limit: ''
};

export const addFormField = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    birthDate: ''
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
    addFormField,
    searchResult: [],
    apiStatus: initStatus,
    loadingState: false
};

export const genderOptions = [
    { id: '0', name: '男' },
    { id: '1', name: '女' }
];
