import { useState } from 'react';

/**
 * Custom Hook LocalStorage
 *
 * @param key
 * @param initialValue
 * @returns [storeValue, setValue, remove]
 */
export const useLocalStorage = <T>(key: string, initialValue?: T) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item !== undefined ? JSON.parse(JSON.stringify(item)) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: Object) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    const remove = () => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue, remove];
};
