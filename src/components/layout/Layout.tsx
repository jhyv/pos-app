import { IonContent, IonPage } from '@ionic/react';
import './Layout.css';
import { ReactNode } from 'react';
import { Header } from '../header/Header';

interface LayoutProps {
    children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
    children
}) => {
    return (
        <IonPage>
            <Header />
            <IonContent>
                {children}
            </IonContent>
        </IonPage>
    );
}