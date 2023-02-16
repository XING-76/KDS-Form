import { storesType } from '@containers/reducers';
import Loading from '@modules/Loading';
import React from 'react';
import { useSelector } from 'react-redux';
import PageButtonGroup from './components/PageButtonGroup';
import SearchForm from './components/SearchForm';
import AddForm from './components/AddForm';
import SearchResultTable from './components/SearchResultTable';
import { PageRoutes } from './model/types';
import { initPageRoutes, initSearchResultTableTitle } from './service/pageService';

export default function index() {
    const { loadingState } = useSelector((state: storesType) => ({ ...state.df0001 }));

    const [pageRoutes, setPageRoutes] = React.useState<PageRoutes>(initPageRoutes);
    const [searchResultTableTitles, setSearchResultTableTitles] = React.useState(initSearchResultTableTitle);

    const resetPage = () => {
        setPageRoutes({
            ...initPageRoutes,
            searchForm: {
                ...initPageRoutes.searchForm,
                isDisplay: true
            }
        });
    };

    React.useEffect(() => {
        resetPage();

        return () => {
            resetPage();
            setSearchResultTableTitles(initSearchResultTableTitle);
        };
    }, []);

    return (
        <div className="demoForm__wrapper">
            {loadingState ? <Loading /> : <></>}

            <PageButtonGroup pageRoutes={pageRoutes} setPageRoutes={setPageRoutes} />

            {pageRoutes.searchForm.isDisplay && <SearchForm setPageRoutes={setPageRoutes} pageRoutes={pageRoutes} />}

            {pageRoutes.addForm.isDisplay && <AddForm setPageRoutes={setPageRoutes} pageRoutes={pageRoutes} />}

            {pageRoutes.searchResult.isDisplay && (
                <SearchResultTable searchResultTableTitles={searchResultTableTitles} />
            )}
        </div>
    );
}
