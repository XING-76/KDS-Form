import { HTTP_STATUS_CODE } from '@configs/serviceConfigs';
import Board from '@containers/common/Board';
import InputLabel from '@containers/common/InputLabel';
import {
    handleClickExpand,
    handleRefreshSearchPage,
    handleRefreshMainPage
} from '@containers/common/utils/uiFlowUtils';
import Button from '@modules/Button';
import ButtonWrapper from '@modules/ButtonWrapper';
import Grid from '@modules/Grid';
import { storesType } from '@containers/reducers';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_SEARCH, SET_SEARCH_RESULT } from '../model';
import { searchFormField as initSearchFormField } from '../model/data';
import { PageRoutes } from '../model/types';
import { initPageRoutes, replaceChinese } from '../service/pageService';

type Props = {
    setPageRoutes: React.Dispatch<React.SetStateAction<PageRoutes>>;
    pageRoutes: PageRoutes;
};

const SearchForm = (props: Props) => {
    const { setPageRoutes, pageRoutes } = props;

    const dispatch = useDispatch();

    const { apiStatus } = useSelector((state: storesType) => ({ ...state.df0001 }));

    const [searchFormData, setSearchFormData] = React.useState(initSearchFormField);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur' });

    const handleOnChange = (props: React.ChangeEvent<HTMLInputElement> | Record<string, any>) => {
        const dataTarget = props.target ?? props;
        const { name: inputName, value: inputValue } = dataTarget;

        if (inputName === 'limit') {
            const newValue = replaceChinese(inputValue);

            setSearchFormData({
                ...searchFormData,
                [inputName]: newValue
            });
        }

        setSearchFormData({
            ...searchFormData,
            [inputName]: inputValue
        });
    };

    const handleSubmitForm = () => {
        dispatch(FETCH_SEARCH(searchFormData));
    };

    const handleClearSearchForm = () => {
        reset({ ...initSearchFormField });
        dispatch(SET_SEARCH_RESULT([]));
        handleRefreshMainPage(setPageRoutes, initPageRoutes);
    };

    /**
     * ????????????????????????????????????
     */
    React.useEffect(() => {
        const { code } = apiStatus;
        if (code === HTTP_STATUS_CODE.OK) {
            handleRefreshSearchPage(setPageRoutes, pageRoutes);
        }
    }, [apiStatus]);

    return (
        <div className="wrapper">
            <Board
                title="??????"
                titlePosition="left"
                handleToggleExpand={() => handleClickExpand(setPageRoutes, pageRoutes, 'searchForm')}
                isContentShow={pageRoutes.searchForm.isExpand}
                isShowToggleLineHeightButton>
                <Grid row>
                    <Grid col xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                        <InputLabel
                            type="number"
                            label="????????????"
                            name="limit"
                            onChange={handleOnChange}
                            required
                            register={register}
                            messages={{
                                required: '???????????????????????????',
                                maxLength: '?????????????????? 2'
                            }}
                            message={(errors?.limit as string) && (errors?.limit?.message as string)}
                            maxLength={2}
                        />
                    </Grid>
                </Grid>

                <ButtonWrapper buttonPosition="right">
                    <Button color="cancel" onClick={handleClearSearchForm}>
                        ????????????
                    </Button>
                    <Button color="primary" onClick={handleSubmit(handleSubmitForm)}>
                        ??????
                    </Button>
                </ButtonWrapper>
            </Board>
        </div>
    );
};

export default SearchForm;
