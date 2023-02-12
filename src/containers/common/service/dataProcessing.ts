import { ResponseGenerator } from '../model/types';

/**
 * 查詢 回傳欄位值轉換
 * @param response
 * @returns
 */
export const convertResponseOfSearchAPI = (response: ResponseGenerator) => {
    const { object } = response;

    const newData = object?.map((item: any) => {
        const { uuid, deptCode, deptName } = item;

        const response = {
            dataId: uuid,
            departmentCode: deptCode,
            departmentName: deptName
        };

        return response;
    });

    return {
        data: object !== null ? newData : []
    };
};

/**
 * 查詢 請求參數欄位轉換
 * @param request
 * @returns
 */
export const getParametersOfSearchAPI = (request: { id: string }) => {
    const { id } = request;

    return {
        userId: id
    };
};
