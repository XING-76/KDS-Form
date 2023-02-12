import { DateTimeConfig, DateTimeUtils, SeparatorType } from '@utils/dateTimeUtils';
import DateUtils, { TimeTypes } from '@utils/DateUtils';
import ObjectUtils from '@utils/objectUtils';

/**
 * 將 DateLabel 輸出之日期格式轉換成與後端傳遞之日期格式
 * @param originalDate
 * @returns
 */
export const formatRequestDateString = (originalDate: string, timeType?: TimeTypes) => {
    if (!ObjectUtils.isExist(originalDate)) return '';
    const convertedDateString = DateUtils.getDate(DateUtils.getDateObjectByDateString(originalDate));
    return convertedDateString ? DateUtils.getAPIDateFormat(convertedDateString, timeType) : '';
};

/**
 * 將後端回傳之日期格式轉換為，DateLabel 接收之格式、或 text 呈現之日期格式
 * @param date
 * @param format
 * @returns
 */
export const formatDateString = (date: string, format: 'YYYMMDD' | 'YYYMMDDHHMM') => {
    if (!ObjectUtils.isExist(date)) return '';
    return new DateTimeUtils(date)
        .setDateSeparator(SeparatorType.SLASH)
        .setTimeSeparator(SeparatorType.COLON)
        .convert(DateTimeConfig[format as keyof typeof DateTimeConfig])
        .toString();
};

/**
 *
 * @param index 資料序號
 * @param pageNumber 資料所在頁碼
 * @param rowsPerPage 總頁碼
 * @returns 資料 rowNumber 欄位 (NO.)
 */
export const countRowNumber = (index: number, pageNumber: number, rowsPerPage: number) =>
    (pageNumber - 1) * rowsPerPage + (index + 1);
