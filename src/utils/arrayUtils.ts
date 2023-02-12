export const isEmptyArray = <T>(dataSource: Array<T>): boolean => {
    return dataSource.length === 0;
};

/**
 * 轉換物件陣列為兩層物件
 *
 * getKey 為擷取子物件的某一個屬性作為父物件的屬性值
 */
export const convertArrayToObject = <T extends Record<K, any>, K extends keyof any>(
    array: T[] = [],
    getKey: (item: T) => K
) =>
    array.reduce((object, current) => {
        const key = getKey(current);
        return { ...object, [key]: current };
    }, {} as Record<K, T>);

export const isTwoArrayIdentical = (array1: Array<string>, array2: Array<string>) => {
    if (array1.length !== array2.length) return false;

    const sortedArray1 = array1.sort((a, b) => a.localeCompare(b));
    const sortedArray2 = array2.sort((a, b) => a.localeCompare(b));

    for (let i = 0; i < sortedArray1.length; i++) {
        if (sortedArray1[i] !== sortedArray2[i]) return false;
    }

    return true;
};
