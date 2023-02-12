import { ResponseGenerator } from '@containers/common/model/types';
import { SearchFormField } from '../model/types';

/**
 * 查詢 回傳欄位值轉換
 * @param response
 * @returns
 */
export const convertResponseOfSearchAPI = (response: ResponseGenerator) => {
    const { users } = response;

    const newData = users?.map((item: any) => {
        const { id, firstName, lastName, age, gender, birthDate } = item;

        const result = {
            id,
            firstName,
            lastName,
            age,
            gender,
            birthDate
        };

        return result;
    });

    return users !== null ? newData : [];
};

/**
 * 查詢 請求參數欄位轉換
 * @param request
 * @returns
 */
export const getParametersOfSearchAPI = (request: SearchFormField) => {
    const { limit } = request;

    return {
        limit
    };
};
