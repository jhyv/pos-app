import { IonHeader } from '@ionic/react';
import './Header.css';

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {
    return (
        <IonHeader>
            <div className='app-header'>

            </div>
        </IonHeader>
    )
}