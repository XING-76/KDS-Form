import common from '@containers/common/model';
import df0001 from '@containers/DF0001/model';
// import pmsu01 from '@containers/PMSU01/model';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
    common,
    df0001
});

interface action {
    type: string;
    payload?: any;
}

const rootReducer = (state: any, action: action) => {
    switch (action.type) {
        case 'LOGOUT': {
            return appReducer(undefined, action);
        }
        default:
            return appReducer(state, action);
    }
};

export type storesType = ReturnType<typeof rootReducer>;
export default rootReducer;
