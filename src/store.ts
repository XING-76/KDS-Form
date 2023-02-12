import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './containers/reducers';
import rootSaga from './saga';

const SagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: false }).prepend(SagaMiddleware);
    }
});

SagaMiddleware.run(rootSaga);

export default store;
