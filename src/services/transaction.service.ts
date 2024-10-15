import axios from "axios";
import { useHeaders } from ".";
import { API_PATHS, BASE_URL } from "../contants/endpoint.constants";
import { Transaction } from "../models";


export const uploadTransaction = (transaction: Transaction) => {
    return axios.post(`${BASE_URL}${API_PATHS.UPLOAD_TRANSACTIONS}`, transaction, { headers: useHeaders() });
}
