import { API_PREFIX, HTTP_METHOD, SERVICE_URL_CONFIG } from '@configs/serviceConfigs';
import { httpRequest } from '@service/callAPIRequest';
import { getUrlByParameters } from '@utils/urlUtils';

export default class Common {
    /**
     * 取得模擬使用者資料
     *  @urlParam
     */
    static async searchUsers(data): Promise<any> {
        const parameters = getUrlByParameters(data);
        return await httpRequest({
            url: `${API_PREFIX}/${SERVICE_URL_CONFIG.DummyJSON.users as string}?${parameters}`,
            method: HTTP_METHOD.GET
        });
    }
}
