import { IonModal } from '@ionic/react';
import './PopupModal.css';
import { ReactNode } from 'react';

interface PopupModalProps {
    state: boolean;
    setState: (state: boolean) => any;
    size?: 'small' | 'medium' | 'large';
    backdropDismiss?: boolean;
    children?: ReactNode;
    onModalClose?: any;
}

export const PopupModal: React.FC<PopupModalProps> = ({
    state,
    size,
    setState,
    backdropDismiss,
    onModalClose,
    children
}) => {
    return (
        <IonModal
            className={`alert-container ${size ?? 'medium'}`}
            isOpen={state} backdropDismiss={backdropDismiss ?? true}
            onIonModalDidDismiss={onModalClose}>
            <div className='wrapper'>
                {children}
            </div>
        </IonModal>
    )
}