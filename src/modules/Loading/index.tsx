import { SET_API_STATUS } from '@containers/common/model';
import { apiStatus as initApiStatus } from '@containers/common/model/data';
import { storesType } from '@containers/reducers';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

const Loading = () => {
    const dispatch = useDispatch();
    const { apiStatus } = useSelector((state: storesType) => ({
        ...state.common
    }));

    // 當fetch失敗關閉loading，並將failed狀態重設為false
    React.useEffect(() => {
        if (apiStatus.failed) dispatch(SET_API_STATUS({ ...apiStatus, failed: false }));
    }, [apiStatus.failed]);

    // 待任一component再次打開loading時，重設apiStatus
    React.useEffect(() => {
        dispatch(SET_API_STATUS({ ...initApiStatus, pending: true }));

        return () => {
            dispatch(SET_API_STATUS(initApiStatus));
        };
    }, []);

    return (
        <>
            {apiStatus.pending && (
                <div className="loading__backdrop">
                    <svg
                        className="loading__spinner"
                        width="65px"
                        height="65px"
                        viewBox="0 0 66 66"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle
                            className="loading__path"
                            fill="none"
                            strokeWidth="5"
                            strokeLinecap="round"
                            cx="33"
                            cy="33"
                            r="30"></circle>
                    </svg>
                    <div className="loading__label">
                        Loading ... <br />
                        刷新頁面中 ... 請耐心等候
                    </div>
                </div>
            )}
        </>
    );
};

export default Loading;
