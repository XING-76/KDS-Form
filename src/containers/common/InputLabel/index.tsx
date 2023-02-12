import { errorTypeConfigs } from '@configs/commonCode';
import Label from '@modules/Label';
import ObjectUtils from '@utils/objectUtils';
import React from 'react';
import './style.scss';

interface Props {
    className?: string;
    onClick?: Function;
    onChange?: Function;
    onBlur?: Function;
    onComposition?: Function;
    label?: string;
    name?: string;
    type?: string;
    message?: string;
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    defaultValue?: string;
    value?: string;
    required?: boolean;
    register?: any;
    maxLength?: number;
    minLength?: number;
    validate?: Function;
    pattern?: object;
    messages?: { [key in errorTypeConfigs]?: string };
    dataIndex?: number;
    minValue?: number;
    isShowIntervalMark?: boolean;
}

const InputLabel = (props: Props) => {
    const {
        name,
        label,
        className = '',
        onClick,
        onChange,
        onBlur,
        onComposition,
        type = 'text',
        placeholder = '',
        message = '',
        disabled = false,
        readonly = false,
        defaultValue,
        value,
        required = false,
        register,
        maxLength,
        minLength,
        messages,
        pattern,
        validate,
        dataIndex,
        minValue,
        isShowIntervalMark = false
    } = props;

    const [keyword, setKeyword] = React.useState('');
    const [isOnComposition, setIsOnComposition] = React.useState(false);

    const handleOnClick = (event: React.MouseEvent<HTMLInputElement>) => {
        if (onClick) onClick(event);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (readonly || disabled) return;

        setKeyword(event.target.value);
        if (onChange) onChange(event);
    };

    const handleComposition = (event: React.CompositionEvent) => {
        if (readonly || disabled) return;
        if (event.type === 'compositionend') {
            setKeyword((event.target as HTMLInputElement).value);
            setIsOnComposition(false);
        } else setIsOnComposition(true);
    };

    const handleOnBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (readonly || disabled) return;
        if (onBlur) onBlur(event);
    };

    React.useEffect(() => {
        if (!isOnComposition && ObjectUtils.isExist(onComposition as Function)) {
            const getComposition = (onComposition as Function)();
            if (!ObjectUtils.isExist(getComposition)) return;
            getComposition(keyword);
        }
    }, [keyword, isOnComposition]);

    const getHandlerBinding = () => (register ? getRegisterRefAndRest() : getOnBlurHandler());

    /**
     *  未使用hook-form register但props有自定義onBlur事件
     * @returns
     */
    const getOnBlurHandler = () => {
        return {
            registerRef: null as unknown as Object,
            rest: {
                onBlur: handleOnBlur
            }
        };
    };

    /**
     * 處理綁定hook-form register
     * @returns
     */
    const getRegisterRefAndRest = () => {
        const requiredField = required ? { required: messages?.required ?? '' } : null;
        const validateField = validate && { validate };
        const patternField = pattern && { pattern: { value: pattern, message: messages?.pattern ?? '' } };
        const maxLengthField = maxLength && { maxLength: { value: maxLength, message: messages?.maxLength ?? '' } };
        const minLengthField = minLength && { minLength: { value: minLength, message: messages?.minLength ?? '' } };

        const { ref: registerRef, ...rest } = register(name, {
            ...requiredField,
            ...maxLengthField,
            ...minLengthField,
            ...validateField,
            ...patternField
        });

        //  當props有傳入其他自定義onBlur事件
        if (onBlur) {
            return {
                registerRef,
                rest: {
                    ...rest,
                    onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                        rest.onBlur(event);
                        handleOnBlur(event);
                    }
                }
            };
        }

        return { registerRef, rest };
    };

    return (
        <div
            className={`input__wrapper  ${className} ${ObjectUtils.isExist(message) ? 'errorInput' : ''} ${
                required ? 'required' : ''
            }`}>
            {ObjectUtils.isExist(label as any) && (
                <Label htmlFor={name} className={`label__top ${readonly ? 'readonly' : ''} `}>
                    {label}
                </Label>
            )}

            <input
                {...getHandlerBinding()?.rest}
                className={readonly ? 'readonly' : ''}
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                onClick={handleOnClick}
                onChange={handleOnChange}
                onCompositionStart={handleComposition}
                onCompositionUpdate={handleComposition}
                onCompositionEnd={handleComposition}
                defaultValue={defaultValue}
                disabled={disabled}
                value={value}
                data-index={dataIndex}
                min={minValue}
                ref={getHandlerBinding()?.registerRef}
            />
            {isShowIntervalMark && <div className="intervalMark">~</div>}

            {ObjectUtils.isExist(message) && <p>{message}</p>}
        </div>
    );
};

export default InputLabel;
