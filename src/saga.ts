import { MainSaga as CommonSaga } from '@containers/common/model/saga';
import { MainSaga as Df0001Saga } from '@containers/DF0001/model/saga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
    yield all([CommonSaga(), Df0001Saga()]);
}

export default rootSaga;
