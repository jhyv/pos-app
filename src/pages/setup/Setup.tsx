import { useEffect } from 'react';
import { Layout } from '../../components';
import './Setup.css';
import { checkDevice } from '../../services';
import { IonSpinner, isPlatform, useIonAlert, useIonLoading, useIonRouter } from '@ionic/react';
import { useDevice, useStore } from '../../hooks';
import { getDeviceID } from '../../utils/native.utils';
import { AxiosResponse } from 'axios';
import { Network } from '@capacitor/network';
import Logger from '../../utils/logger.utils';
import { useDeviceStore, useProductStore } from '../../store';

interface SetupProps { }

export const Setup: React.FC<SetupProps> = () => {

    const { saveToken, saveUser, setDevice, setNetwork, setupDevice, checkUser, user, token } = useDevice();
    const { fetchProducts, fetchMetadata, uploadTransactions, products } = useStore();
    const [loader, dismiss] = useIonLoading();
    const [presentAlert] = useIonAlert();
    const { push } = useIonRouter();
    const devcieHasHydrated = useDeviceStore(state => state.hasHydrated);
    const productsHasHydrated = useProductStore(state => state.hasHydrated);

    useEffect(() => {
        if (devcieHasHydrated && productsHasHydrated) {
            console.log('[SETUP-DEVICE] user', user);
            initData();
        }
    }, [devcieHasHydrated, productsHasHydrated]);


    const initData = () => {
        checkNetworkConnection();
    }

    const checkUnuploadedTrasnactions = () => {
        uploadTransactions();
    }

    const initDevice = async (connected: boolean) => {
        const device = await getDeviceID();
        setDevice(device);
        checkDeviceStatus(device, connected);
    }

    const showAlert = () => {
        presentAlert(`Network not connected. Please connect to setup the device`, [
            { text: 'Cancel', role: 'cancel' },
            {
                text: 'Retry', handler: () => {
                    initData();
                }
            },

        ]);
    }

    const checkNetworkConnection = async () => {
        if (isPlatform('capacitor')) {
            Network.removeAllListeners();
            Network.addListener('networkStatusChange', (status) => {
                Logger.log('[checkNetworkConnection] networkStatusChange', status);
                setNetwork(status);
            });

            const status = await Network.getStatus();
            setNetwork(status);


            if (status.connected) {
                fetchMetadata();
                checkUnuploadedTrasnactions();
            }

            initDevice(status.connected);

        } else {
            setNetwork({ connected: true, connectionType: 'none' });
            fetchMetadata();
            initDevice(true);
            checkUnuploadedTrasnactions();
        }
    }

    const checkDeviceStatus = async (device: any, connected: boolean) => {
        console.log('[checkDeviceStatus] token', token);
        console.log('[checkDeviceStatus] user', user);
        console.log('[checkDeviceStatus] connected', connected);
        console.log('[checkDeviceStatus] device', device);

        if (connected && (!token || !user)) {
            loader({
                message: 'Checking Device Information',
                duration: 10000
            });

            const response: AxiosResponse = await checkDevice(device);
            await dismiss();

            if (response.data?.success && response.data.data) {
                saveUser(response.data.data.user)
                saveToken(response.data.data.token);
                fetchProducts().then(() => {
                    if (!window.location.pathname.includes('/order'))
                        push('/order');
                });
            } else {
                setupDevice(device).then((response: AxiosResponse) => {
                    if (response.data?.success && response.data.data) {
                        saveUser(response.data.data.user)
                        saveToken(response.data.data.token);
                        fetchProducts().then(() => {
                            if (!window.location.pathname.includes('/order'))
                                push('/order');
                        });
                    }
                });

            }
        } else {
            if (user && products.length > 0) {
                push('/order')
            } else {
                showAlert();
            }
        }
    }
    return (
        <Layout hideHeader={true}>
            <div className='setup-wrapper'>
                <div className='setup-loader'>
                    <IonSpinner name='circular' />
                    <div className='setup-label'>
                        Setting up Device
                    </div>
                </div>
            </div>
        </Layout>
    )
}