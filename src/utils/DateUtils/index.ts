import { DayObject, TimeTypes } from './types';

class DateUtils {
    /**
     * 取得一年的所有日曆天
     * @param year
     * @param isAD 是否為西元年
     */
    static createDaysInYear(year: number, isAD: boolean): Array<any> {
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (!isAD) {
            year = year + 1911;
        }

        // 判斷潤年
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            daysInMonth[1] = 29;
        }

        const daysInPreviousMoth = ([] as Array<number>).concat(daysInMonth);

        // 設定上個月的天數
        // daysInPreviousMoth.unshift(daysInPreviousMoth.pop()!);
        daysInPreviousMoth.unshift(daysInPreviousMoth.pop() as number);

        // 獲取上個月要補齊的天數
        const addDaysPreMonth = new Array(12).fill(null).map((item, index) => {
            return new Date(year, index, 1).getDay(); // 每個月的第一天
        });

        // 顯示一年中每個月的數據
        const daysInYear = new Array(12).fill([]).map((month, monthIndex) => {
            let addDays = addDaysPreMonth[monthIndex]; // 這個月要補的天數
            const daysCount = daysInMonth[monthIndex]; // 這個月有幾天
            let daysCountPrevious = daysInPreviousMoth[monthIndex]; // 前個月有幾天
            const monthData = [] as Array<any>;

            // 補足上個月
            for (; addDays > 0; addDays--) {
                let lastMonth = 0;
                if (monthIndex === 0) lastMonth = 12;
                else lastMonth = monthIndex;

                const day = daysCountPrevious--;

                const weekDay = new Date(getLastYear(true, year, lastMonth), lastMonth - 1, day).getDay();

                monthData.unshift({
                    year: getLastYear(isAD, year, lastMonth),
                    month: lastMonth,
                    day,
                    weekDay: DateUtils.weekDayFormat(weekDay)
                });
            }

            // 添加這個月
            for (let i = 0; i < daysCount; ) {
                const month = monthIndex + 1;
                const day = ++i;
                const weekDay = new Date(year, month - 1, day).getDay();
                monthData.push({
                    year: isAD ? year : year - 1911,
                    month,
                    day,
                    weekDay: DateUtils.weekDayFormat(weekDay)
                });
            }

            // 補足下個月
            for (let i = 42 - monthData.length, j = 0; j < i; ) {
                let nextMonth = 0;
                const day = ++j;

                if (monthIndex === 11) nextMonth = 1;
                else nextMonth = monthIndex + 2;

                const weekDay = new Date(getNextYear(true, year, nextMonth), nextMonth - 1, day).getDay();
                monthData.push({
                    year: getNextYear(isAD, year, nextMonth),
                    month: nextMonth,
                    day,
                    weekDay: DateUtils.weekDayFormat(weekDay)
                });
            }

            return monthData;
        });
        return daysInYear;
    }

    static weekDayFormat(weekDay: number) {
        let value;
        switch (weekDay) {
            case 1:
                value = '一';
                return value;
            case 2:
                value = '二';
                return value;
            case 3:
                value = '三';
                return value;
            case 4:
                value = '四';
                return value;
            case 5:
                value = '五';
                return value;
            case 6:
                value = '六';
                return value;
            case 0:
                value = '日';
                return value;
        }
        return value;
    }

    /**
     * 取得日期間毫秒差
     * @param startDate
     * @param endDate
     * @returns
     */
    static diffTime(startDate: Date, endDate: Date): number {
        return endDate.getTime() - startDate.getTime();
    }

    /**
     * 轉換API response dateTime為dateString;
     * @param dateTime
     * @param isAd
     * @returns YYY/MM/DD
     */
    static getDateStringByDateTime(dateTime: Date, isAd: boolean = false) {
        const date = new Date(dateTime);
        let year = date.getFullYear();
        if (!isAd) year -= 1911;

        return `${year}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
            .getDate()
            .toString()
            .padStart(2, '0')}`;
    }

    /**
     *
     * @param dateString 時間字串110/04/05
     * @param isAd 回傳值是否為西元年
     * @returns
     */
    static getDateObjectByDateString(dateString: string, isAd: boolean = true) {
        const [year, month, day] = dateString.split('/');

        return {
            year: isAd ? parseInt(year) + 1911 : parseInt(year),
            month: parseInt(month),
            day: parseInt(day)
        };
    }

    /**
     * 由dayObject取得Date格式
     * @param year
     * @param month
     * @param day
     * @returns
     */
    static getDate(dayObject: DayObject) {
        const { year, month, day } = dayObject;
        const monthIndex = month - 1;
        return new Date(year, monthIndex, day);
    }

    /**
     * 依照傳入timeType將DateTime轉換成 YYYY-MM-DD HH:MM:SS
     * (timeType END 取得YYYY/MM/DD 23:59:59)
     * @param dateTime
     * @param timeType
     * @returns
     */
    static getAPIDateFormat(dateTime: Date, timeType?: TimeTypes) {
        const current = new Date();

        const dateString = `${dateTime.getFullYear().toString().padStart(4, '0')}-${(dateTime.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${dateTime.getDate().toString().padStart(2, '0')}`;

        const currentTimeString = `${current.getHours().toString().padStart(2, '0')}:${current
            .getMinutes()
            .toString()
            .padStart(2, '0')}:${current.getSeconds().toString().padStart(2, '0')}`;

        if (timeType === TimeTypes.CURRENT) return `${dateString} ${currentTimeString}`;
        if (timeType === TimeTypes.START) return `${dateString} 00:00:00`;
        if (timeType === TimeTypes.END) return `${dateString} 23:59:59`;

        if (!timeType)
            return `${dateString} ${dateTime.getHours().toString().padStart(2, '0')}:${dateTime
                .getMinutes()
                .toString()
                .padStart(2, '0')}:${dateTime.getSeconds().toString().padStart(2, '0')}`;
    }

    /**
     * 取得當日日期物件
     * @param isAd 是否為西元年
     * @returns
     */
    static getCurrentDateObject(isAd: boolean = false) {
        const current = new Date();
        let year = current.getFullYear();

        if (!isAd) year -= 1911;

        return {
            year,
            month: current.getMonth() + 1,
            day: current.getDate(),
            weekDay: DateUtils.weekDayFormat(current.getDay())
        };
    }

    /**
     * 判斷傳入日期所在月份之天數
     * @param date
     */
    static getDateDuration(date: string | Date) {
        const dateTime = new Date(date);
        dateTime.setMonth(dateTime.getMonth() + 1);
        dateTime.setDate(0);

        return dateTime.getDate();
    }
}

const getLastYear = (isAd: boolean, year: number, lastMonth: number) => {
    if (lastMonth === 12) year -= 1;
    if (!isAd) year -= 1911;
    return year;
};

const getNextYear = (isAd: boolean, year: number, nextMonth: number) => {
    if (nextMonth === 1) year += 1;
    if (!isAd) year -= 1911;
    return year;
};

export default DateUtils;
export * from './types';
