export enum SystemEnvironment {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test'
}

export const { PROJECT_NAME } = process.env;

export enum SystemFunctionDataSource {
    COMMON = 'COMMON',
    DF0001 = 'DF0001'
}

export const SystemFunctionSettings: typeof SystemFunctionDataSource = Object.keys(SystemFunctionDataSource).reduce(
    (key, value) => ({ ...key, [value]: PROJECT_NAME === 'true' ? value.toLowerCase() : value }),
    SystemFunctionDataSource
);
