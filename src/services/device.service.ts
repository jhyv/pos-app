import axios from 'axios';
import { API_PATHS, BASE_URL } from '../contants/endpoint.constants';
import Logger from '../utils/logger.utils';

export const checkDevice = (device: any) => {
    Logger.log('[checkDevice] device', device);
    return axios.get(`${BASE_URL}${API_PATHS.CHECK_DEVICE}`, { params: device });
}

export const registerDevice = (branch_id: any, device: any) => {
    const payload: any = device;
    payload.branch_id = branch_id;

    return axios.post(`${BASE_URL}${API_PATHS.REGISTER_DEVICE}`, payload);
}