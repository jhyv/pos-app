import axios from "axios"
import { useHeaders } from "."
import { API_PATHS, BASE_URL } from "../contants/endpoint.constants"
import Logger from "../utils/logger.utils"

export const getMetaData = () => {
    Logger.log('[getMetaData]')
    return axios.get(`${BASE_URL}${API_PATHS.METADATA}`, { headers: useHeaders() })
}
