import React from 'react';
import './ModalConfirm.scss';
import { useCountdown } from '../hooks/useCountdown';

interface ModalConfirmProps {
    title?: string;
    message?: string;
    seconds?: number;
    onConfirm: () => void;
    onClose: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
                                                       title = 'Подтвердите действие',
                                                       message = 'Вы уверены, что хотите продолжить?',
                                                       seconds = 5,
                                                       onConfirm,
                                                       onClose,
                                                   }) => {
    const left = useCountdown(seconds, onClose);

    return (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
            <div className="modal">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="actions">
                    <button className="btn btn-danger" onClick={onConfirm}>Удалить</button>
                    <button className="btn" onClick={onClose}>Отмена</button>
                </div>
                <div className="timer">Автозакрытие через {left} c</div>
            </div>
        </div>
    );
};

export default ModalConfirm;