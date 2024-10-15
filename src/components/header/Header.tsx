import { IonButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './Header.css';
import { FaCloud, FaCog, FaSync, FaThList } from "react-icons/fa";
import { UploadTransactions } from '../upload-transactions/UploadTransactions';
import { useState } from 'react';
import { useStore } from '../../hooks';
interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {

    const [transacModal, setTransacModal] = useState(false);
    const { isSyncing } = useStore();
    const onTransacModalClose = () => {
        setTransacModal(false);
    }
    return (
        <>
            <IonHeader mode='md' class='ion-no-border'>
                <IonToolbar>
                    <IonTitle>DUDE POS</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton onClick={() => setTransacModal(true)}>
                            {
                                isSyncing ?
                                    <FaSync size={30} className='spinning-anim' /> :
                                    <FaCloud size={30} />
                            }
                        </IonButton>
                        {/* <IonButton>
                            <FaThList size={30} />
                        </IonButton>
                        <IonButton>
                            <FaCog size={30} />
                        </IonButton> */}
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <UploadTransactions
                state={transacModal}
                setState={setTransacModal}
                onModalClose={onTransacModalClose}
            />
        </>
    )
}