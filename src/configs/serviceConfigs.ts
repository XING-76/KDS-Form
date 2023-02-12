// import { SystemFunctionSettings } from './systemConfig';

/**
 * API Configuration
 */
export const TOKEN_PREFIX = 'Bearer';
export const DEFAULT_TIMEOUT = 70000;
export const IS_HTTP_OVERRIDE = process.env.HTTP_OVERRIDE_STATUS;
export const { API_AUTH_PREFIX } = process.env;
export const { API_PREFIX } = process.env;
export const { FILE_PREFIX } = process.env;
export const { API_GATEWAY_PREFIX } = process.env;
export const { OAUTH_GRANT_TYPE } = process.env;

type IObject = Record<string, any>;

export const APP_NAME = {
    KDAUTH: 'KDAUTH',
    KDPMS: 'KDPMS'
};

export const DEFAULT_PAGINATION = {
    pageNumber: 1,
    rowsPerPage: 5,
    sortDirection: '',
    sortColumn: ''
};

export const HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export const SERVICE_URL_CONFIG: IObject = {
    COMMON: {
        common: 'common',
        units: 'units',
        import: 'import'
    },
    DummyJSON: {
        users: 'users'
    }
};

export const HTTP_STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NO_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

// export const REQUEST_URL_BEFORE_LOGIN = {
//     getValidationCodeImage: `${API_AUTH_PREFIX}/api/${SERVICE_URL_CONFIG.COMMON.common}/${SERVICE_URL_CONFIG.COMMON.validate}/${SERVICE_URL_CONFIG.COMMON.captcha}`
// };
