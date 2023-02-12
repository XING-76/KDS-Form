import { HTTP_METHOD, HTTP_STATUS_CODE, IS_HTTP_OVERRIDE } from '@configs/serviceConfigs';
// import ObjectUtils from '@utils/objectUtils';

type IOverrideMethodMap = {
    [id: string]: string;
};

// export const authHeader = (): object => {
//     const token = localStorage.getItem('token');
//     if (!ObjectUtils.isExist(token as string)) return {};
//     return { Authorization: `${TOKEN_PREFIX} ${token as string}` };
// };

// export const setAuthHeader = (url: string): object => {
//     return url !== REQUEST_URL_BEFORE_LOGIN.getValidationCodeImage ? authHeader() : {};
// };

export const overrideMethod = (method: string) => {
    const overrideMethodMap: IOverrideMethodMap = {
        GET: HTTP_METHOD.GET,
        PUT: HTTP_METHOD.POST,
        DELETE: HTTP_METHOD.POST,
        POST: HTTP_METHOD.POST
    };
    if (IS_HTTP_OVERRIDE === 'true') return overrideMethodMap[method.toUpperCase()];
    return method;
};

export const setXhttpOverrideHeader = (method: any) => (IS_HTTP_OVERRIDE ? { 'X-HTTP-Method-Override': method } : {});

export const handleResponse = (response: any) => {
    // if (response.url.includes(REQUEST_URL_BEFORE_LOGIN.getValidationCodeImage)) {
    //     return response.blob();
    // }

    return response.text().then((text: any) => {
        const data = Boolean(text) && JSON.parse(text);

        if (!response.ok) {
            const errorLog = {
                status: response.status,
                errorCode: (data && data.errorCode) || '',
                errorMessage: data && data?.message,
                errorDetail: data ? data.errorDetail : {}
            };

            if (response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
                localStorage.removeItem('token');
                window.dispatchEvent(new Event('storage'));
            }
            return Promise.reject(errorLog);
        }

        return data;
    });
};

export const timeout = async (millisecond: number, controller: any, promise: Promise<any>): Promise<any> => {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('timeout'));
            controller.abort();
        }, millisecond);
        promise.then(resolve, reject);
    });
};
