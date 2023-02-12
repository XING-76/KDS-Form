import { isEmptyArray } from './arrayUtils';
import { padTo2Digits } from './numberUtils';
/**
 * DateTime轉換器 日期格式
 */
export enum DateTimeConfig {
    YYYMMDD = 'YY_MM_DD',
    YYYMMDDHHMMSS = 'YY_MM_DD_HH_mm_SS',
    YYYMMDDHHMM = 'YY_MM_DD_HH_mm',
    HHMMSS = 'HH_mm_SS'
}

/**
 * 分隔符號類型
 */
export enum SeparatorType {
    DASH = '-',
    SLASH = '/',
    COLON = ':',
    BLANK = ' ',
    UNDERLINE = '_'
}

/**
 * DateTime 轉換器
 *
 * convert Method 帶入 DateTime 格式配置
 * setSeparator 帶入間隔符號（若無設定時，預設為沒有間隔）
 */
export class DateTimeUtils {
    private _result: string;
    private _YY: string;
    private _MM: string;
    private _DD: string;
    private _HH: string;
    private _mm: string;
    private _SS: string;
    private _pattern: string = '';
    private _dateSeparator: string = '-';
    private _timeSeparator: string = ':';

    constructor(dateTime: string | number) {
        if (!isNaN(Number(dateTime)) || typeof dateTime === 'number') {
            const originDate = new Date(dateTime);
            dateTime = this.dateFormatToYYYYMMDDHHMMSS(originDate);
        }
        this.convertUnitValue(dateTime);
        this.preConvert();
    }

    private readonly dateFormatToYYYYMMDDHHMMSS = (dateTime: Date) => {
        return (
            [dateTime.getFullYear(), padTo2Digits(dateTime.getMonth() + 1), padTo2Digits(dateTime.getDate())].join(
                SeparatorType.DASH
            ) +
            SeparatorType.BLANK +
            [
                padTo2Digits(dateTime.getHours()),
                padTo2Digits(dateTime.getMinutes()),
                padTo2Digits(dateTime.getSeconds())
            ].join(SeparatorType.COLON)
        );
    };

    private readonly convertUnitValue = (dateTime: string) => {
        const [dateData, timeData] = dateTime.split(SeparatorType.BLANK);
        [this._YY, this._MM, this._DD] = dateData.split(SeparatorType.DASH);
        [this._HH, this._mm, this._SS] = timeData.split(SeparatorType.COLON);
        this._result = dateTime;
    };

    private readonly preConvert = () => {
        const eraStart = 1911;
        this._YY = (Number(this._YY) - eraStart).toString();
        this.convert(DateTimeConfig.YYYMMDDHHMMSS);
    };

    convert = (format: string) => {
        this._pattern = format;
        const dateFieldList: Array<string> = [];
        const timeFieldList: Array<string> = [];

        format.split(SeparatorType.UNDERLINE).map((type) => {
            Object.entries(this).map((property) => {
                const [fieldName, fieldValue] = property;
                if (fieldName === `${SeparatorType.UNDERLINE}${type}`) {
                    if (
                        [
                            `${SeparatorType.UNDERLINE}YY`,
                            `${SeparatorType.UNDERLINE}MM`,
                            `${SeparatorType.UNDERLINE}DD`
                        ].includes(fieldName)
                    )
                        dateFieldList.push(fieldValue);
                    if (
                        [
                            `${SeparatorType.UNDERLINE}HH`,
                            `${SeparatorType.UNDERLINE}mm`,
                            `${SeparatorType.UNDERLINE}SS`
                        ].includes(fieldName)
                    )
                        timeFieldList.push(fieldValue);
                }
            });
        });

        this._result = `${dateFieldList.join(this._dateSeparator)}`;
        if (!isEmptyArray(dateFieldList) && !isEmptyArray(timeFieldList)) this._result += `${SeparatorType.BLANK}`;
        if (!isEmptyArray(timeFieldList)) this._result += `${timeFieldList.join(this._timeSeparator)}`;
        return this;
    };

    setDateSeparator = (separator: string) => {
        this._dateSeparator = separator;
        if (this._pattern !== '') this.convert(this._pattern);
        return this;
    };

    setTimeSeparator = (separator: string) => {
        this._timeSeparator = separator;
        if (this._pattern !== '') this.convert(this._pattern);
        return this;
    };

    getYear = () => {
        return this._YY;
    };

    getMonth = () => {
        return this._MM;
    };

    getDay = () => {
        return this._DD;
    };

    public toString = () => {
        return this._result;
    };
}
