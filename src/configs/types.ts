import { searchableDropDownOptions } from '@containers/common/model/types';

export interface Dictionary<T> {
    [id: string]: {
        [id: string]: T;
    };
}

export interface StatusConfigs {
    isAvailable: string;
    isDisabled: string;
}

export interface ModalTypeConfig {
    view: string;
    edit: string;
    add: string;
}

export interface ColumnConfig<T> {
    label: string;
    name: keyof T;
    type: 'input' | 'dropdown' | 'date' | 'upload' | 'textarea';
    options?: Array<searchableDropDownOptions>;
    characters: Array<'readonly' | 'required'>;
    portion?: number;
}
