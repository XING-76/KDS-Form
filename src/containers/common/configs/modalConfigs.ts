import { StatusModalTypeConfigs, StatusModalTypes } from '../model/types';

// StatusModal
export const statusModalTextConfigs: StatusModalTypeConfigs = {
    [StatusModalTypes.SUCCESS]: {
        icon: 'check',
        iconColor: 'green',
        modalMessage: '成功'
    },
    [StatusModalTypes.FAIL]: {
        icon: 'failed',
        iconColor: 'red',
        modalMessage: '失敗'
    },
    [StatusModalTypes.WARNING]: {
        icon: 'warning',
        iconColor: 'orange',
        modalMessage: ''
    }
};
