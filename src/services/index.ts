import { STORAGE_TYPES } from '../contants';

export const useHeaders = () => {
    const token = localStorage.getItem(STORAGE_TYPES.TOKEN);
    return {
        Authorization: `Bearer ${token}`
    };
}

export * from './products.service';
export * from './device.service';
export * from './transaction.service';