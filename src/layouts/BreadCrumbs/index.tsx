import Icon from '@modules/Icon';
import { Link, useLocation } from 'react-router-dom';
import { SystemFunctionDataSource } from '@configs/systemConfig';
import './style.scss';

const BreadCrumbs = () => {
    const location = useLocation();

    const currentBreadcrumb = location?.pathname;

    const isHomePage = currentBreadcrumb === '/';

    return (
        <div className="breadcrumbs__wrapper">
            <div className="breadcrumbs__item">
                <Link to="/" className="breadcrumbs__text">
                    首頁
                </Link>
                {!isHomePage ? (
                    <span className="icon__expand">
                        <Icon icon="expand" />
                    </span>
                ) : (
                    <></>
                )}
            </div>

            {!isHomePage ? (
                <div className="breadcrumbs__item">
                    <a className="breadcrumbs__text">{SystemFunctionDataSource.DF0001}</a>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default BreadCrumbs;
