import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxResponseColumns, sendPayloadObject } from '@utils/reduxUtils';
import { initialState, userData as initUserData } from './data';

export const slice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        FETCH_SEARCH: sendPayloadObject(ReduxResponseColumns.PAYLOAD),
        FETCH_LOG_OUT: (state) => {
            return {
                ...state,
                userData: initUserData,
                routes: [],
                isLoggedIn: false
            };
        },
        SET_IS_SIDEBAR_OPEN: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                sidebarStatus: {
                    ...state.sidebarStatus,
                    isOpen: action.payload
                }
            };
        },
        SET_USER_DATA: sendPayloadObject('userData'),
        SET_GLOBAL_STYLE: sendPayloadObject('globalStyle'),
        SET_SEARCH_RESULT: sendPayloadObject('searchResult'),
        SET_API_STATUS: sendPayloadObject('apiStatus'),
        SET_IS_STATUS_MODAL_OPEN: (state, action: PayloadAction<any>) => {
            const { isOpen, statusModalType, message, detail } = action.payload;
            return {
                ...state,
                statusModal: {
                    statusModalType,
                    isOpen,
                    customMessage: message,
                    customNote: detail
                }
            };
        }
    }
});

export const {
    FETCH_SEARCH,
    FETCH_LOG_OUT,
    SET_IS_SIDEBAR_OPEN,
    SET_USER_DATA,
    SET_GLOBAL_STYLE,
    SET_SEARCH_RESULT,
    SET_API_STATUS,
    SET_IS_STATUS_MODAL_OPEN
} = slice.actions;
export default slice.reducer;
