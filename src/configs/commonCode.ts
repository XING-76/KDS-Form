import { Dictionary, ModalTypeConfig, StatusConfigs } from './types';

export const commonCode: Dictionary<string> = {
    KEYCODE: {
        enter: '13'
    },
    KEY: {
        escape: 'Escape',
        enter: 'Enter'
    }
};

export const renderMessage: Dictionary<string> = {
    placeholder: {
        SELECT: '請選擇',
        INPUT: '請輸入',
        DATE: '年/月/日'
    }
};

export enum FileActionConfigs {
    ADD = `ADD`,
    DELETE = `DELETE`
}

export enum CodeKindConfigs {
    NEWS_TYPE = 'NewsType',
    DATA_STATE = 'DataState',
    ORGANIZATION_LEVEL = 'OrgLevel',
    FONT_SIZE = 'FontSize',
    LAND_SOURCE = 'LandSource',
    LAND_CLASS = 'LandClass',
    LAND_ADD_CAUSE = 'LandAddCause',
    LAND_ADJUST_REASON = 'LandAdjustReason',
    LAND_MANAGE_CAUSE = 'LandManageCause',
    LAND_REGISTER_CAUSE = 'LandRgeCause',
    LAND_REDUCE_CAUSE = 'LandReduceCause',
    LAND_PRICE_TYPE = 'LandPriceType',
    LAND_SITUATION = 'LandSituation',
    LAND_TAX_TYPE = 'LandTaxType',
    LAND_TAX_REDUCE_REASON = 'LandTaxReduceReason',
    LAND_TAX_CHECK_STATUS = 'LandTaxCheckStatus',
    LAND_IMPROVE_ADD_REASON = 'LandImproveAddReason',
    LAND_IMPROVE_ADJUST_REASON = 'LandImproveAdjustReason',
    LAND_IMPROVE_REDUCE_REASON = 'LandImproveReduceReason',
    OWNERSHIP = 'Ownership',
    OWNER = 'Owner',
    PROPERTY_KIND = 'PropertyKind',
    PROPERTY_USE_KIND = 'PropertyUseKind',
    USE_ZONING = 'UseZoning',
    OTHER_OWNER = 'OtherOwner',
    PROPERTY_NO_TYPE = 'propertyNoType',
    USER_PERMISSION = 'UserPermission',
    PERMISSION_LEVEL = 'PermissionLevel',
    APPLY_RESULT = 'ApplyResult',
    DEPRECIATION_FUNCTION = 'DeprFunction',
    CHATTEL_ADD_REASON = 'ChattelAddReason',
    CHATTEL_ADJUST_REASON = 'ChattelAdjustReason',
    CHATTEL_REDUCE_REASON = 'ChattelReduceReason',
    STUFF_ADD_REASON = 'StuffAddReason',
    CHECK_TAX_PROOF = 'CheckTaxProof',
    BUILD_ADJUST_REASON = 'BuildAdjustReason',
    RIGHT_ADD_REASON = 'RigthAddReason',
    BUILD_ADD_REASON = 'BuildAddReason',
    STOCK_ADD_REASON = 'StockAddReason',
    STOCK_REDUCE_REASON = 'StockReduceReason',
    BOOK_REDUCE_REASON = 'BookReduceReason',
    BOOK_ADD_REASON = 'BookAddReason',
    RIGHT_REDUCE_REASON = 'RigthReduceReason',
    RIGHT_ADJUST_REASON = 'RightAdjustReason',
    BUILD_REDUCE_REASON = 'buildReduceReason',
    ISSUES_STATUS = 'IssuesStatus',
    ISSUES_TYPE = 'IssuesType'
}

export const statusConfigs: StatusConfigs = {
    isAvailable: '0', // 啟用中
    isDisabled: '1' // 已註銷
};

export const booleanCodeConfig = {
    true: '1',
    false: '0'
};

export const booleanDisplayNameConfig = {
    true: '是',
    false: '否'
};

export const tableRowEditStatus = {
    enableEdit: '0',
    disableEdit: '1' // 禁用編輯
};

export const modalTypeConfig: ModalTypeConfig = {
    view: 'view',
    edit: 'edit',
    add: 'add'
};

export const fontSizeConfig = {
    '0': '14px',
    '1': '16px',
    '2': '18px'
};

export enum MimeTypeConfigs {
    ODS = 'application/vnd.oasis.opendocument.spreadsheet',
    PDF = 'application/pdf',
    XLS = '	application/vnd.ms-excel',
    XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ZIP = 'application/zip',
    PPT = 'application/mspowerpoint',
    PPTX = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    DOC = 'application/msword',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    JPG = 'image/jpeg',
    PNG = 'image/png',
    GIF = 'image/gif',
    ODT = 'application/vnd.oasis.opendocument.text',
    TXT = 'text/*',
    CSV = 'text/csv'
}

export enum errorTypeConfigs {
    REQUIRED = 'required',
    MAX_LENGTH = 'maxLength',
    MIN_LENGTH = 'minLength',
    PATTERN = 'pattern',
    MANUAL = 'manual',
    VALIDATION = 'validation',
    MAX_VALUE = 'maxValue',
    MIN_VALUE = 'minValue'
}

export enum ErrorCommonMessage {
    REQUIRED = '為必填',
    MAX_LENGTH = '長度必須小於',
    MIN_LENGTH = '長度必須至少',
    PATTERN = '格式不符合',
    MAX_VALUE = '值不可大於',
    MIN_VALUE = '值不可小於'
}

export enum ValidateActionType {
    RE_VALIDATE = 'reValidate',
    CLEAR_ERROR = 'clearError'
}

export enum ApiStatusTypeConfigs {
    SEARCH = 'search',
    ADD = 'add',
    GET_BY_ID = 'getByID',
    EDIT = 'edit',
    DELETE = 'delete',
    ENTER = 'enter',
    CANCEL_ENTER = 'cancelEnter',
    PREVIEW = 'preview',
    BATCH_ADD = 'batchAdd',
    RE_SEARCH = 'reSearch'
}

export enum colTypeConfigs {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    DROPDOWN = 'dropdown',
    DATE = 'date',
    INPUT_INTERVAL = 'input_interval',
    DROPDOWN_INTERVAL = 'dropdown_interval',
    DATE_INTERVAL = 'date_interval',
    PROPERTY = 'property',
    DEPARTMENT_SEARCH = 'editor_search',
    DEPARTMENT_DROPDOWN = 'editor_dropdown',
    FILE = 'file',
    BUTTON = 'button',
    TRANSFER_LIST = 'transfer_list',
    NESTED_CHECKLIST = 'nested_checklist'
}

export enum userRoleConfigs {
    GENERAL_USER = 'generalUser',
    SYSTEM_ADMIN = 'sysAdmr',
    ACCOUNT_ADMIN = 'accountAdmr',
    PROPERTY_ADMIN = 'propertyAdmr',
    CASE_ADMIN = 'caseAdmr',
    DEPARTMENT_ACCOUNT_ADMIN = 'deptAccountAdmr',
    DEPARTMENT_PROPERTY_ADMIN = 'deptPropertyAdmr',
    UNIT_PROPERTY_ADMIN = 'unitPropertyAdmr',
    DEPARTMENT_ITEM_ADMIN = 'deptItemAdmr',
    UNIT_ITEM_ADMIN = 'unitItemAdmr',
    DEPARTMENT_PROPERTY_SEEKER = 'deptPropertySeeker',
    DEPARTMENT_ITEM_SEEKER = 'deptItemSeeker',
    KEEPER = 'keeper',
    UNIT_CASE_ADMIN = 'unitCaseAdmr',
    MAINTAINER = 'maintainer'
}
