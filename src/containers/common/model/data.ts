import { State, StatusModalTypes } from './types';

export const userData = {
    parentId: '',
    departmentId: '',
    departmentCode: '',
    departmentName: '',
    unitId: '',
    unitName: '',
    userId: ''
};

export const statusModal = {
    isOpen: false,
    statusModalType: StatusModalTypes.SUCCESS,
    customMessage: '',
    customNote: ''
};

export const apiStatus = {
    failed: false,
    pending: false,
    type: '',
    code: 0
};

export const initialState: State = {
    globalStyle: {
        lineHeight: 'loose',
        fontSize: 'medium',
        themeColor: 'normal'
    },
    sidebarStatus: {
        isOpen: false
    },
    statusModal,
    apiStatus
};
