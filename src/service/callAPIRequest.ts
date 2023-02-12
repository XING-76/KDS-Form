import { DEFAULT_TIMEOUT, HTTP_METHOD } from './../configs/serviceConfigs';
import { handleResponse, overrideMethod, setXhttpOverrideHeader, timeout } from './helper';

type requestProps = (
    content: {
        url: string;
        method: string;
        headers?: any;
        data?: any;
    },
    timeoutMillisecond?: number,
    options?: object
) => Promise<object>;

export const httpRequest: requestProps = async (
    { url = '', method = HTTP_METHOD.GET, headers = { 'content-type': 'application/json' }, data = null ?? '' },
    timeoutMillisecond = Number(DEFAULT_TIMEOUT),
    options = {}
) => {
    if (headers['content-type'] === 'application/json') {
        data = data ? JSON.stringify(data) : null;
    }

    const controller = new AbortController();
    const { signal } = controller;

    return await timeout(
        timeoutMillisecond,
        controller,
        fetch(url, {
            method: overrideMethod(method),
            signal,
            body: data || null,
            headers: { ...headers, ...setXhttpOverrideHeader(method) },
            ...options
        })
            .then(handleResponse)
            .then((response) => response)
    );
};
