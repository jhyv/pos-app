import { useEffect } from 'react';
import { Layout } from '../../components';
import './Setup.css';
import { useProductStore } from '../../store';
import { checkDevice, getProducts } from '../../services';
import { Response } from '../../models';
import { useIonLoading, useIonRouter } from '@ionic/react';
import { useDevice, useStore } from '../../hooks';
import { getDeviceID } from '../../utils/native.utils';
import { getMetaData } from '../../services/metadata.service';

interface SetupProps { }

export const Setup: React.FC<SetupProps> = () => {
    const { saveToken, saveUser, setDevice } = useDevice();
    const { fetchProducts, fetchMetadata, products } = useStore();
    const [loader, dismiss] = useIonLoading();
    const navigation = useIonRouter();

    useEffect(() => {
        initDevice();
    }, []);

    const initDevice = async () => {
        const device = await getDeviceID();
        setDevice(device);
        await fetchMetadata();
        checkDeviceStatus(device);
    }

    const checkDeviceStatus = async (device: any) => {
        loader({
            message: 'Checking Device Information',
            duration: 10000
        });

        const response: Response = await checkDevice(device);
        await dismiss();

        if (response.data?.success && response.data.data) {
            saveUser(response.data.data.user)
            saveToken(response.data.data.token);
            fetchProducts().then(() => {
                navigation.push('/order');
            });
        } else {
            // open setup modal
        }
    }

    return (
        <Layout hideHeader={true}>
        </Layout>
    )
}