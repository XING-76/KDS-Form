import { SystemFunctionSettings } from '@configs/systemConfig';
import NotFound from '@containers/common/NotFoundPage';
import DF0001 from '@containers/DF0001';
import HomePage from '@containers/HomePage';
import PageLayout from '@layouts/PageLayout';
import { routerURL } from './routerConfigs';

const children = [
    { index: true, element: <HomePage /> },
    { path: routerURL.property?.[SystemFunctionSettings.DF0001], element: <DF0001 /> },
    { path: '*', element: <NotFound /> }
];

const routes = () => {
    return [
        {
            path: '/',
            element: <PageLayout />,
            children
        },
        { path: '/login', element: <>Login</> }
    ];
};

export default routes;
