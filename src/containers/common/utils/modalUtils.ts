import { SET_IS_STATUS_MODAL_OPEN } from '../model';
import { FormModalTypes, ModalBlockStatus, PageRoutes, StatusModalTypes } from '../model/types';

/**

 * @param modalType 標示類型
 * @param message 打開 statusModal 附加訊息
 * @returns
 */
export const openStatusModal = (modalType: keyof typeof StatusModalTypes, message: string) => {
    return SET_IS_STATUS_MODAL_OPEN({
        statusModalType: StatusModalTypes[modalType],
        isOpen: true,
        message
    });
};

export const getFormModalType = (pageRoutes: PageRoutes) => {
    if ((pageRoutes.editFormModal as ModalBlockStatus).isOpen) return FormModalTypes.EDIT_FORM;
    if ((pageRoutes.viewFormModal as ModalBlockStatus).isOpen) return FormModalTypes.VIEW_FORM;
};

export const isInputReadonly = (pageRoutes: PageRoutes) => {
    if ((pageRoutes.editFormModal as ModalBlockStatus).isOpen) return false;
    if ((pageRoutes.viewFormModal as ModalBlockStatus).isOpen) return true;
};
