import axios from "axios";
import { useHeaders } from ".";
import { API_PATHS, BASE_URL } from "../contants/endpoint.constants";


export const uploadTransaction = (transaction: any) => {
    return axios.post(`${BASE_URL}${API_PATHS.UPLOAD_TRANSACTIONS}`, transaction, { headers: useHeaders() });
}
