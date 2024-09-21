import { useDevice } from '../hooks';

export const getHeaders = () => {
    const { token } = useDevice();
    return {
        Authorization: `Bearer ${token}`
    }
}

export * from './products.service';
export * from './device.service';
export * from './transaction.service';