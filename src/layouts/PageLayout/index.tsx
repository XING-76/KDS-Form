import '@assets/css/_reset.scss';
import '@assets/css/_resetSelect.scss';
import { layoutConfigs } from '@configs/layoutConfigs';
// import StatusModal from '@containers/common/Modals/StatusModal';
import { storesType } from '@containers/reducers';
import BreadCrumbs from '@layouts/BreadCrumbs';
// import Sidebar from '@layouts/Sidebar';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
// import Calendar from '../Calendar';
import Header from '../Header';
import './style.scss';

const PageLayout = () => {
    const commonState = useSelector((state: storesType) => ({ ...state.common }));
    const { sidebarStatus } = commonState;

    const location = useLocation();

    const handleChangeSidebarWidth = (isSidebarOpen: boolean) => {
        if (isSidebarOpen)
            document.documentElement.style.setProperty('--custom-sideBarWidth', layoutConfigs.SIDEBAR_WIDTH.expand);
        if (!isSidebarOpen)
            document.documentElement.style.setProperty('--custom-sideBarWidth', layoutConfigs.SIDEBAR_WIDTH.shrink);
    };

    const handleScrollToTop = () => (document.querySelector('.main__content') as HTMLInputElement).scrollTo(0, 0);

    React.useEffect(() => handleChangeSidebarWidth(sidebarStatus.isOpen), [sidebarStatus.isOpen]);

    React.useEffect(() => handleScrollToTop(), [location]);

    return (
        <React.Fragment>
            {/* <StatusModal /> */}
            <div className="pageLayout">
                <Header />

                <div className="content__wrapper">
                    {/* <Sidebar /> */}

                    <div className="main__content_wrapper">
                        <BreadCrumbs />
                        <div className="main__content">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default PageLayout;
