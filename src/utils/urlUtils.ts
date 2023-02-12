import ObjectUtils from './objectUtils';

/**
 * 依照傳入data轉換為url
 * @param parameters {curNum:1,size:5}
 * @returns curNum=1&size=5
 */
export const getUrlByParameters = (parameters: object) => {
    const array: Array<string> = [];
    for (const [key, value] of Object.entries(parameters)) {
        if (ObjectUtils.isExist(value as string)) array.push(`${key}=${value as string}`);
    }

    return array.join('&');
};
