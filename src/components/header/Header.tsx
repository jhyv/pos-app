import { IonButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './Header.css';
import { FaCloud, FaCog, FaThList } from "react-icons/fa";
interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {
    return (
        <IonHeader mode='md' class='ion-no-border'>
            <IonToolbar>
                <IonTitle>DUDE POS</IonTitle>
                <IonButtons slot='end'>
                    <IonButton>
                        <FaCloud size={30} />
                    </IonButton>
                    <IonButton>
                        <FaThList size={30} />
                    </IonButton>
                    <IonButton>
                        <FaCog size={30} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    )
}