export type DayObject = {
    year: number;
    month: number;
    day: number;
    weekDay?: string;
};

export enum TimeTypes {
    CURRENT = 'current',
    START = 'start',
    END = 'end'
}
