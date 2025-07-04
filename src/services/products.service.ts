import axios from "axios";
import { API_PATHS, BASE_URL } from "../contants/endpoint.constants";
import { useHeaders } from ".";

export const getProducts = () => {
    return axios.get(`${BASE_URL}${API_PATHS.PRODUCTS}`, { headers: useHeaders() });
}