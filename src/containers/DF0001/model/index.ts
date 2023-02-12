import { createSlice } from '@reduxjs/toolkit';
import { ReduxResponseColumns, sendPayloadObject } from '@utils/reduxUtils';
import { initialState } from './data';

export const slice = createSlice({
    name: 'df0001',
    initialState,
    reducers: {
        FETCH_SEARCH: sendPayloadObject(ReduxResponseColumns.PAYLOAD),
        SET_SEARCH_RESULT: sendPayloadObject('searchResult'),
        SET_API_STATUS: sendPayloadObject('apiStatus'),
        SET_LOADING_STATE: sendPayloadObject('loadingState')
    }
});

export const { FETCH_SEARCH, SET_SEARCH_RESULT, SET_API_STATUS, SET_LOADING_STATE } = slice.actions;
export default slice.reducer;
