import { commonCode, errorTypeConfigs } from '@configs/commonCode';
import { searchableDropDownOptions } from '@containers/common/model/types';
import Icon from '@modules/Icon';
import Label from '@modules/Label';
import { isEmptyArray } from '@utils/arrayUtils';
import ObjectUtils from '@utils/objectUtils';
import React from 'react';
import './style.scss';

type Props = {
    disabled?: boolean;
    readonly?: boolean;
    label?: string;
    name: string;
    value?: string;
    defaultValue?: string;
    customOptions: Array<searchableDropDownOptions>;
    required?: boolean;
    hideDefault?: boolean;
    onChange?: Function;
    onBlur?: Function;
    onClick?: Function;
    message?: string;
    register?: any;
    messages?: { [key in errorTypeConfigs]?: string };
    validate?: any;
    clearErrors?: Function;
    dataIndex?: number;
    isShowIntervalMark?: boolean;
};

const SearchableDropDown = (props: Props) => {
    const {
        disabled = false,
        readonly = false,
        label,
        name,
        customOptions,
        required = false,
        hideDefault = false,
        defaultValue,
        onChange,
        onBlur,
        onClick,
        message,
        register,
        messages,
        validate,
        dataIndex,
        isShowIntervalMark = false
    } = props;
    /**
     * 轉換選項的 id 及 name
     * @param IdOrName 轉換對象 （選項的 id 或 name)
     * @param currentKey 目前傳入轉換對象的 key (字串 key id 或 name)
     * @returns
     */
    const convertIdAndName = (IdOrName: string, currentKey: keyof searchableDropDownOptions) => {
        const convertedKey = currentKey === 'id' ? 'name' : 'id';

        const targetOption = !ObjectUtils.isExist(IdOrName) ? [fixedOptions.current.default] : customOptions;
        const matchedOption = targetOption.find((option: searchableDropDownOptions) => {
            return option[currentKey] === IdOrName;
        });

        if (!ObjectUtils.isExist(matchedOption as searchableDropDownOptions)) return '';

        return (matchedOption as searchableDropDownOptions)[convertedKey];
    };

    const fixedOptions = React.useRef({
        noResult: { name: '無資料', id: 'none' },
        default: { name: '請選擇', id: 'default-value' }
    });

    const [filteredOptions, setFilteredOptions] = React.useState(customOptions);
    const [isOptionsShow, setIsOptionsShow] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(
        defaultValue ? convertIdAndName(defaultValue, 'id') : fixedOptions.current.default.name
    );
    const isFirstRender = React.useRef(true);
    const inputElement = React.useRef(null);
    const searchableDropDownElement = React.useRef(null);
    const optionsElement = React.useRef(null);
    const [parentNodes, setParentNodes] = React.useState([]);
    const [previousOptionName, setPreviousOptionName] = React.useState(inputValue);

    /**
     * 處理點選選項列表展開
     */
    const handleClickOptionsExpand = () => {
        if (disabled || readonly) return setIsOptionsShow(false);

        setIsOptionsShow(!isOptionsShow);
        handleResetFilteredOptions();
        if (inputValue === fixedOptions.current.default.name) setInputValue('');
    };

    /**
     * 處理選項由點選選項清單改變
     * @param event
     * @returns
     */
    const handleOptionSelect = (event: React.MouseEvent) => {
        const targetOptionId = (event.target as Element).getAttribute('id');
        const targetOptionName = (event.target as Element).getAttribute('data-name');

        if (readonly || disabled) return;
        const returnValue = targetOptionId === fixedOptions.current.default.id ? '' : targetOptionId;
        if (onChange) onChange({ name, value: returnValue });

        setInputValue(targetOptionName as string);
        setPreviousOptionName(targetOptionName as string);

        setIsOptionsShow(false);
    };

    /**
     * 處理選項由使用者輸入而改變
     * @param event
     */
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = event.target.value;
        if (readonly || disabled) return;

        setInputValue(targetValue);
    };

    const handleOnBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (readonly || disabled) return;
        if (onBlur) onBlur(event);

        if (inputValue === fixedOptions.current.default.name || inputValue === '') {
            if (onChange) onChange({ name, value: '' });
            setInputValue(previousOptionName);
        } else {
            const matchedOption = customOptions.find((option: searchableDropDownOptions) => {
                return option.name === inputValue;
            });

            if (!ObjectUtils.isExist(matchedOption as searchableDropDownOptions)) {
                const returnValue = convertIdAndName(previousOptionName, 'name');
                if (onChange) onChange({ name, value: returnValue });
                setInputValue(previousOptionName);
            }
        }

        setIsOptionsShow(false);
    };

    /**
     * 處理點選 input 範圍
     */
    const handleClickInput = (event: MouseEvent) => {
        if (ObjectUtils.isExist(onClick as Function)) (onClick as Function)(event);
        if (disabled || readonly) return setIsOptionsShow(false);

        setIsOptionsShow(true);
        handleResetFilteredOptions();

        if (inputValue === fixedOptions.current.default.name) setInputValue('');
    };

    /**
     * 處理點選展開選項時重置篩選選項為全部
     */
    const handleResetFilteredOptions = () => {
        const customOptionNames = customOptions.map((item) => item.name);
        if (customOptionNames.includes(inputValue)) setFilteredOptions(customOptions);
    };
    /**
     * 處理選項過濾
     * @returns
     */
    const handleFilterOptions = () => {
        const filteredOptions = customOptions.filter((item) => {
            return item.name?.includes(inputValue);
        });

        if (isEmptyArray(filteredOptions)) return setFilteredOptions([fixedOptions.current.noResult]);
        setFilteredOptions(filteredOptions);
        handleResetFilteredOptions();
    };

    const isNoMatch = filteredOptions.length === 1 && filteredOptions[0].id === fixedOptions.current.noResult.id;

    const isDefaultOptionShow = hideDefault ? false : !(isNoMatch || filteredOptions.length !== customOptions.length);

    /**
     * 取得 input 的座標及元素寬度
     * @returns
     */
    const getInputCoordinationAndWidth = () => {
        if (!inputElement.current) return;
        const inputBoundingClientRect: DOMRect = (inputElement.current as HTMLElement).getBoundingClientRect();

        return {
            top: inputBoundingClientRect.top + inputBoundingClientRect.height,
            left: inputBoundingClientRect.left,
            width: inputBoundingClientRect.width
        };
    };

    /**
     * 處理點擊下拉選單外圍
     * @param event
     */
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (searchableDropDownElement.current && !(searchableDropDownElement.current as any).contains(target))
            setIsOptionsShow(false);
    };

    /**
     * 處理滑鼠滾動
     */
    const handleScroll = () => {
        setIsOptionsShow(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === commonCode.KEY.escape) setIsOptionsShow(false);
    };

    /**
     * 取得目前 component parentNode array
     * @returns
     */
    const getParentNodes = () => {
        const mainContentWrapper = document.querySelector('.main__content') as Element;
        const modalContentWrapper = document.querySelector('.modal__wrapper .board__content') as Element;
        const modalTableScroll = document.querySelector('.modal__wrapper .table__scroll') as Element;

        const parentNodesArray: any[] = [];

        if (ObjectUtils.isExist(modalTableScroll)) {
            if (modalTableScroll.contains(searchableDropDownElement.current)) parentNodesArray.push(modalTableScroll);
        }
        if (ObjectUtils.isExist(modalContentWrapper)) {
            if (modalContentWrapper.contains(searchableDropDownElement.current))
                parentNodesArray.push(modalContentWrapper);
        }
        if (ObjectUtils.isExist(mainContentWrapper)) {
            if (mainContentWrapper.contains(searchableDropDownElement.current))
                parentNodesArray.push(mainContentWrapper);
        }

        return parentNodesArray;
    };

    // 處理無 register 時候的 onblur handler binding
    const getOnBlurHandler = () => {
        if (ObjectUtils.isExist(register)) return null;

        return { onBlur: handleOnBlur };
    };

    const getRegisterRefAndRest = () => {
        if (!register || !ObjectUtils.isExist(register)) return null;

        const requiredField = required && { required: messages?.required ?? '' };
        const validateField = ObjectUtils.isExist(validate) && { validate };
        const { ref: registerRef, ...rest } = register(name, {
            ...requiredField,
            ...validateField
        });

        return {
            registerRef,
            rest: {
                ...rest,
                onBlur: (event: any) => {
                    rest.onBlur(event);
                    handleOnBlur(event);
                }
            }
        };
    };

    const handleOptionsMouseDown = (event: React.MouseEvent<HTMLElement>) => event.preventDefault();

    const getOptionListMaxHeight = () => {
        if (!ObjectUtils.isExist(inputElement.current)) return;
        if (!inputElement.current) return;

        const bufferDistanceToEdge = 5;
        const viewPortHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const referenceBoundingClientRect: DOMRect = (inputElement.current as HTMLElement).getBoundingClientRect();
        const optionListMaxHeight = viewPortHeight - referenceBoundingClientRect?.bottom - bufferDistanceToEdge;

        return optionListMaxHeight;
    };

    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (inputValue !== fixedOptions.current.default.name) handleFilterOptions();
    }, [inputValue]);

    React.useEffect(() => {
        if (isEmptyArray(parentNodes)) return;

        parentNodes.forEach((parentNode: HTMLElement) => {
            parentNode.addEventListener('scroll', handleScroll);
            parentNode.addEventListener('click', handleClickOutside);
        });

        return () => {
            parentNodes.forEach((parentNode: HTMLElement) => {
                if (!parentNode) return;
                parentNode.removeEventListener('scroll', handleScroll);
                parentNode.removeEventListener('click', handleClickOutside);
            });
        };
    }, [parentNodes]);

    // 當選項改變時，將由新的 customOptions 當中找到相對應的選項設定在 inputValue值
    React.useLayoutEffect(() => {
        setFilteredOptions(customOptions);
        setInputValue(defaultValue ? convertIdAndName(defaultValue, 'id') : fixedOptions.current.default.name);
    }, [customOptions]);

    // 當 defaultValue 改變，判斷目前是否 input 是否 focus （代表正在輸入），若不是才 setInputValue，避免在輸入清空時回復成請選擇
    React.useEffect(() => {
        if (inputElement.current !== document.activeElement) {
            const newDisplayValue = defaultValue
                ? convertIdAndName(defaultValue, 'id')
                : fixedOptions.current.default.name;
            setInputValue(newDisplayValue);
            setPreviousOptionName(newDisplayValue);
        }
    }, [defaultValue]);

    React.useEffect(() => {
        const parentNodesArray = getParentNodes();
        setParentNodes(parentNodesArray as any);
    }, []);

    // 點選選單區塊時時取消 input 區塊預設 onBlur 行為
    React.useEffect(() => {
        if (!optionsElement.current) return;
        if (!inputElement.current) return;

        if (isOptionsShow) (optionsElement.current as any).addEventListener('mousedown', handleOptionsMouseDown);
        if (!isOptionsShow) (inputElement.current as any).blur();

        return () => {
            (optionsElement.current as any)?.removeEventListener('mousedown', handleOptionsMouseDown);
        };
    }, [isOptionsShow]);

    return (
        <div
            className={`searchableDropDown__wrapper ${required && 'required'} ${
                ObjectUtils.isExist(message as string) && 'errorInput'
            }`}
            ref={searchableDropDownElement}
            onKeyDown={handleKeyDown}>
            <Label htmlFor={name} className="label">
                {label}
            </Label>
            <input
                {...getRegisterRefAndRest()?.rest}
                autoComplete="off"
                disabled={disabled}
                name={name}
                className={`${readonly && 'readonly'}`}
                value={inputValue}
                onChange={handleOnChange}
                onClick={handleClickInput}
                id={name}
                data-index={dataIndex}
                ref={(element) => {
                    inputElement.current = element as any;
                    getRegisterRefAndRest()?.registerRef(element);
                }}
                {...getOnBlurHandler()}
            />
            <Icon icon="expand" className="arrowDown" onClick={!readonly && handleClickOptionsExpand} />
            {isOptionsShow && (
                <ul
                    id="options"
                    ref={optionsElement}
                    className={` ${isNoMatch && 'noMatch'} searchableDropDown__options`}
                    onMouseUp={handleOptionSelect}
                    style={{
                        top: getInputCoordinationAndWidth()?.top,
                        left: getInputCoordinationAndWidth()?.left,
                        width: getInputCoordinationAndWidth()?.width,
                        maxHeight: getOptionListMaxHeight()
                    }}>
                    <>
                        {isDefaultOptionShow && (
                            <li
                                key={fixedOptions.current.default.id}
                                id={fixedOptions.current.default.id}
                                data-name={fixedOptions.current.default.name}
                                className={`${
                                    inputValue === fixedOptions.current.default.name
                                } && 'previousSelect option`}>
                                {fixedOptions.current.default.name}
                            </li>
                        )}

                        {filteredOptions.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    id={item.id}
                                    data-name={item.name}
                                    className={`${inputValue === item.name && 'previousSelect'} option`}>
                                    {item.name}
                                </li>
                            );
                        })}
                    </>
                </ul>
            )}
            {isShowIntervalMark && <div className="intervalMark">~</div>}

            {ObjectUtils.isExist(message as string) && <p className="errorMessage">{message}</p>}
        </div>
    );
};

export default SearchableDropDown;
