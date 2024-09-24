import { IonContent, IonPage } from '@ionic/react';
import './Layout.css';
import { ReactNode } from 'react';
import { Header } from '../header/Header';

interface LayoutProps {
    children?: ReactNode;
    hideHeader?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    hideHeader
}) => {
    return (
        <IonPage>
            {
                !hideHeader &&
                <Header />
            }
            <IonContent>
                {children}
            </IonContent>
        </IonPage>
    );
}