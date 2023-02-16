import Board from '@containers/common/Board';
import InputLabel from '@containers/common/InputLabel';
import { handleClickExpand } from '@containers/common/utils/uiFlowUtils';
import Button from '@modules/Button';
import ButtonWrapper from '@modules/ButtonWrapper';
import SearchableDropDown from '@containers/common/SearchableDropDown';
import Grid from '@modules/Grid';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FETCH_ADD } from '../model';
import { addFormField as initAddFormField, genderOptions } from '../model/data';
import { PageRoutes } from '../model/types';

type Props = {
    setPageRoutes: React.Dispatch<React.SetStateAction<PageRoutes>>;
    pageRoutes: PageRoutes;
};

const AddForm = (props: Props) => {
    const { setPageRoutes, pageRoutes } = props;

    const dispatch = useDispatch();

    const [addFormData, setAddFormData] = React.useState(initAddFormField);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur' });

    const handleOnChange = (props: React.ChangeEvent<HTMLInputElement> | Record<string, any>) => {
        const dataTarget = props.target ?? props;
        const { name: inputName, value: inputValue } = dataTarget;

        setAddFormData({
            ...addFormData,
            [inputName]: inputValue
        });
    };

    const handleSubmitForm = () => {
        dispatch(FETCH_ADD(addFormData));
    };

    const handleClearSearchForm = () => {
        reset({ ...initAddFormField });
        setAddFormData(initAddFormField);
    };

    return (
        <div className="wrapper">
            <Board
                title="新增"
                titlePosition="left"
                handleToggleExpand={() => handleClickExpand(setPageRoutes, pageRoutes, 'addForm')}
                isContentShow={pageRoutes.addForm.isExpand}
                isShowToggleLineHeightButton>
                <Grid row>
                    <Grid col xs="12" sm="6" md="3" lg="3" xl="3" xxl="3">
                        <InputLabel
                            label="姓"
                            name="lastName"
                            onChange={handleOnChange}
                            required
                            register={register}
                            messages={{
                                required: '姓為必填選項',
                                maxLength: '長度必須小於 10'
                            }}
                            message={(errors?.lastName as string) && (errors?.lastName?.message as string)}
                            maxLength={10}
                        />
                    </Grid>

                    <Grid col xs="12" sm="6" md="3" lg="3" xl="3" xxl="3">
                        <InputLabel
                            label="名"
                            name="firstName"
                            onChange={handleOnChange}
                            required
                            register={register}
                            messages={{
                                required: '名為必填選項',
                                maxLength: '長度必須小於 10'
                            }}
                            message={(errors?.firstName as string) && (errors?.firstName?.message as string)}
                            maxLength={10}
                        />
                    </Grid>

                    <Grid col xs="12" sm="6" md="3" lg="3" xl="3" xxl="3">
                        <InputLabel
                            type="number"
                            label="年齡"
                            name="age"
                            onChange={handleOnChange}
                            required
                            register={register}
                            messages={{
                                required: '年齡為必填選項',
                                maxLength: '位數必須小於 3'
                            }}
                            message={(errors?.age as string) && (errors?.age?.message as string)}
                            maxLength={3}
                        />
                    </Grid>

                    <Grid col xs="12" sm="6" md="3" lg="3" xl="3" xxl="3">
                        <SearchableDropDown
                            label="性別"
                            name="gender"
                            customOptions={genderOptions}
                            defaultValue={addFormData?.gender}
                            onChange={handleOnChange}
                            hideDefault
                            register={register}
                            required={true}
                            messages={{ required: '性別為必填選項' }}
                            message={(errors.gender as string) && (errors?.gender?.message as string)}
                            validate={(value: string) => value !== '請選擇' || '性別為必填選項'}
                        />
                    </Grid>
                </Grid>

                <ButtonWrapper buttonPosition="right">
                    <Button color="cancel" onClick={handleClearSearchForm}>
                        清除條件
                    </Button>
                    <Button color="primary" onClick={handleSubmit(handleSubmitForm)}>
                        查詢
                    </Button>
                </ButtonWrapper>
            </Board>
        </div>
    );
};

export default AddForm;
