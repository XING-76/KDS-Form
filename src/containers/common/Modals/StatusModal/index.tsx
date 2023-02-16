import { SET_IS_STATUS_MODAL_OPEN } from '@containers/common/model';
import { storesType } from '@containers/reducers';
import Icon from '@modules/Icon';
import Modal from '@modules/Modal';
import ObjectUtils from '@utils/objectUtils';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { statusModalTextConfigs } from '../../configs/modalConfigs';
import '../css/statusModal.scss';

const StatusModal = () => {
    const dispatch = useDispatch();
    const targetContainer = document.querySelector('#root') as HTMLElement;

    const { statusModal } = useSelector((state: storesType) => ({ ...state.common }));
    const type = statusModal?.statusModalType;
    const { customMessage = '', customNote } = statusModal;

    const handleCloseModal = () =>
        dispatch(SET_IS_STATUS_MODAL_OPEN({ statusModalType: type, isOpen: false, message: '' }));

    return ReactDOM.createPortal(
        <>
            {statusModal.isOpen ? (
                <Modal handleCancel={handleCloseModal} className="statusModal__wrapper">
                    <Icon className="modal__icon_close" icon="close" onClick={() => handleCloseModal()} />
                    <div className="statusModal">
                        <Icon
                            icon={statusModalTextConfigs[type].icon}
                            className={`modal__icon_${statusModalTextConfigs[type].iconColor}`}
                        />
                        <div className="modal__message">
                            {customMessage.includes('\n') &&
                                customMessage?.split('\n').map((item, index) => <p key={index}>{item}</p>)}

                            {(!customMessage.includes('\n') && customMessage) ??
                                statusModalTextConfigs[type].modalMessage}
                        </div>

                        {ObjectUtils.isExist(customNote) && (
                            <>
                                <div className="separator" />
                                <div className="modal__message_note">
                                    {customNote.split(',').map((line: string, index: number) => {
                                        return (
                                            <div key={index} className="line">
                                                {line}
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </Modal>
            ) : null}
        </>,
        targetContainer
    );
};

export default StatusModal;
