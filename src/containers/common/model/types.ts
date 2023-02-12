export interface searchableDropDownOptions {
    id: string;
    name: string;
}

export interface ApiStatus {
    type?: string;
    code?: number;
    data?: any;
}

export interface ResponseGenerator {
    status?: number;
    error?: string;
    message?: string;
    object?: any;
    [key: string]: any;
    page?: {
        curNum: number;
        size: number;
        totalElements: number;
        totalPages: number;
        dir: string;
        sort: string;
    };
}

export interface PageRoutes {
    [key: string]: BlockStatus | ModalBlockStatus | MainBlockStatus;
}

export interface BlockStatus {
    isDisplay?: boolean;
    isExpand?: boolean;
    isNotSave?: boolean;
    isModeEdit?: boolean;
    isDisplayChart?: boolean;
    isClickDelete?: boolean;
    isLeave?: boolean;
    isFormSave?: boolean;
    destination?: keyof PageRoutes | null;
    mode?: 'view' | 'edit';
    name?: string;
}

export enum ModalType {
    EDIT = 'edit',
    VIEW = 'view',
    ADD = 'add'
}

export enum FormModalTypes {
    EDIT_FORM = 'EDIT_FORM',
    VIEW_FORM = 'VIEW_FORM'
}

export interface ModalBlockStatus {
    isOpen: boolean;
    isNotSave?: boolean;
    isModeEdit?: boolean;
    mode?: ModalType;
    isClickOk?: boolean;
    destination?: keyof PageRoutes | null;
    operation?: string;
    [key: string]: any;
}

export interface MainBlockStatus {
    mainPage: boolean;
    detailPage: boolean;
}

export enum StatusModalTypes {
    SUCCESS = `SUCCESS`,
    FAIL = `FAIL`,
    WARNING = `WARNING`
}

export type SearchResultTableTitle = {
    isCheckbox?: boolean;
    function?: string;
    titleText: string;
    titleCode: string;
    isDisplay: boolean;
};

export interface State {
    globalStyle: {
        lineHeight: string;
        fontSize: string;
        themeColor: string;
    };
    sidebarStatus: {
        isOpen: boolean;
    };
    apiStatus: ApiStatus & {
        failed?: boolean;
        pending?: boolean;
    };
}
