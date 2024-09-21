import axios from 'axios';
import { getDeviceID } from '../utils/native.utils';
import { API_PATHS, BASE_URL } from '../contants/endpoint.constants';

export const checkDevice = () => {
    const payload = getDeviceID();

    return axios.get(`${BASE_URL}${API_PATHS.CHECK_DEVICE}`, { params: payload });
}

export const registerDevice = (branch_id: any) => {
    const payload: any = getDeviceID();
    payload.branch_id = branch_id;

    return axios.post(`${BASE_URL}${API_PATHS.REGISTER_DEVICE}`, payload);
}