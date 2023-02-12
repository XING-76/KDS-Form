import { HTTP_STATUS_CODE } from '@configs/serviceConfigs';
import { ResponseGenerator } from '@containers/common/model/types';
import { PayloadAction } from '@reduxjs/toolkit';
import Common from '@service/common';
import { call, put, takeEvery } from 'redux-saga/effects';
import { convertResponseOfSearchAPI, getParametersOfSearchAPI } from '../service/dataProcessing';
import { FETCH_SEARCH, SET_API_STATUS, SET_SEARCH_RESULT, SET_LOADING_STATE } from './index';

function* fetchSearchUsers(action: PayloadAction<any>) {
    try {
        yield put(SET_LOADING_STATE(true));
        const convertedRequest = getParametersOfSearchAPI(action.payload);
        const response: ResponseGenerator = yield call(Common.searchUsers, convertedRequest);
        const convertedResponse = convertResponseOfSearchAPI(response);

        yield put(SET_SEARCH_RESULT(convertedResponse));
        yield put(SET_API_STATUS({ type: 'search', code: HTTP_STATUS_CODE.OK }));
    } catch (error) {
        console.error(error);
        yield put(SET_API_STATUS({ type: 'search', code: error.code }));
        // yield put(
        //     SET_IS_STATUS_MODAL_OPEN({
        //         statusModalType: StatusModalTypes.FAIL,
        //         isOpen: true,
        //         message: error.errorMessage || '查詢失敗'
        //     })
        // );
    } finally {
        yield put(SET_LOADING_STATE(false));
    }
}

function* MainSaga() {
    yield takeEvery(FETCH_SEARCH, fetchSearchUsers);
}

export { MainSaga };
