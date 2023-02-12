import { booleanCodeConfig, booleanDisplayNameConfig } from '@configs/commonCode';
import ObjectUtils from './objectUtils';

class StringUtils {
    static ifPresentOrElse(text: string, replaceSymbol: string): string {
        return ObjectUtils.isExist(text) ? text : replaceSymbol;
    }

    static removeThousandSeparator(text: string): string {
        return text.replace(/(\/|:|,)/g, '');
    }

    static convertBooleanCellValue(value: boolean | string): string {
        if (typeof value !== 'boolean' && !ObjectUtils.isExist(value)) return '';
        if (typeof value === 'boolean') return value ? booleanCodeConfig.true : booleanCodeConfig.false;
        return value === booleanCodeConfig.true ? booleanDisplayNameConfig.true : booleanDisplayNameConfig.false;
    }

    /**
     * boolean -> 0/1
     * @param value
     * @returns
     */
    static convertBooleanToCode(value: boolean | null): string {
        if (typeof value !== 'boolean' && !ObjectUtils.isExist(value)) return booleanCodeConfig.false;
        if (typeof value === 'boolean') return value ? booleanCodeConfig.true : booleanCodeConfig.false;
        return value ? booleanCodeConfig.true : booleanCodeConfig.false;
    }

    /**
     * boolean -> 是/否
     * @param value
     * @returns
     */
    static convertBooleanToDisplayName(value: boolean | null): string {
        if (typeof value !== 'boolean' && !ObjectUtils.isExist(value)) return booleanDisplayNameConfig.false;
        if (typeof value === 'boolean') return value ? booleanDisplayNameConfig.true : booleanDisplayNameConfig.false;
        return value ? booleanDisplayNameConfig.true : booleanDisplayNameConfig.false;
    }

    /**
     * 0/1 -> 是/否
     * @param value
     * @returns
     */
    static convertBooleanCodeToDisplayName(value: string | null): string {
        if (typeof value !== 'string' && !ObjectUtils.isExist(value)) return booleanDisplayNameConfig.false;
        if (typeof value === 'string')
            return value === booleanCodeConfig.true ? booleanDisplayNameConfig.true : booleanDisplayNameConfig.false;
        return value ? booleanDisplayNameConfig.true : booleanDisplayNameConfig.false;
    }

    /**
     * 0/1 -> true/false
     * @param value
     * @returns
     */
    static convertBooleanCodeToBoolean(value: string | null): boolean {
        if (typeof value !== 'string' && !ObjectUtils.isExist(value)) return false;
        if (typeof value === 'string') return value === booleanCodeConfig.true;
        return value === booleanCodeConfig.true;
    }

    /**
     * 是/否 -> 0/1
     * @param value
     * @returns
     */
    static convertBooleanDisplayNameToCode(value: string): string {
        return value === booleanDisplayNameConfig.true ? booleanCodeConfig.true : booleanCodeConfig.false;
    }
}

export default StringUtils;
