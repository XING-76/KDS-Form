export type ValueOf<T> = T[keyof T];

export type FilterConditionally<Source, Condition> = Pick<
    Source,
    { [K in keyof Source]: Source[K] extends Condition ? K : never }[keyof Source]
>;

/**
 * 判斷是否為陣列類型
 * @param source
 * @returns
 */
export const isArrayType = <T>(source: T) => {
    return source instanceof Object && source instanceof Array;
};

/**
 * 判斷是否物件類型
 * @param source
 * @returns
 */
export const isObjectType = <T>(source: T) => {
    return source instanceof Object && !(source instanceof Array);
};

/**
 * 取得 type name
 * @param object
 * @param expression
 * @returns
 */
export const nameOf = <T extends object>(
    object: T,
    expression: (x: { [property in keyof T]: () => string }) => () => string
): string => {
    const res: { [property in keyof T]: () => string } = {} as { [property in keyof T]: () => string };
    Object.keys(object).map((k) => (res[k as keyof T] = () => k));
    return expression(res)();
};

/**
 * 通用物件型別
 */
export type ObjectType<K extends string | number | symbol, V> = { [key in K]: V };
