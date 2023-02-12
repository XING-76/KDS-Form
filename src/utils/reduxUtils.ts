import { PayloadAction } from '@reduxjs/toolkit';

export enum ReduxResponseColumns {
    PAYLOAD = 'payload'
}

export const sendPayloadObject = (columnName: string) => (state: any, action: PayloadAction<any>) => {
    return {
        ...state,
        [columnName]: action.payload
    };
};

/**
 * 組合 Reducer 特定事件和一般事件
 *
 * @param reducerEvent
 * @param basicEventList
 * @returns
 */
export const combineEvent = (reducerEvent: any, basicEventList: Array<any>): Object => {
    const convertedBasicEventList = basicEventList.reduce(
        (previousValue, currentValue) => ({
            ...previousValue,
            [currentValue]: sendPayloadObject(ReduxResponseColumns.PAYLOAD)
        }),
        {}
    );
    return { ...reducerEvent, ...convertedBasicEventList };
};
