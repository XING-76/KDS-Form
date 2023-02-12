import ObjectUtils from './objectUtils';
import StringUtils from './stringUtils';

export const padTo2Digits = (number: number) => {
    return number.toString().padStart(2, '0');
};

class NumberUtils {
    /**
     * 取得千分位格式
     * @param data
     * @returns
     */
    static getThousandFormat = (data: string | number) => {
        if (!ObjectUtils.isExist(data as string)) return '';
        if (data.toString() === '0') return '0';

        const tempData = StringUtils.removeThousandSeparator(data.toString());

        return Number(tempData).toLocaleString('zh-tw');
    };

    /**
     * 取得純數字格式
     * @param data
     * @returns
     */
    static getNumberFormat = (data: number) => {
        return Number(StringUtils.removeThousandSeparator(data.toString()));
    };
}

export default NumberUtils;
