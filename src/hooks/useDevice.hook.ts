import { STORAGE_TYPES } from "../contants";
import { useDeviceStore } from "../store";

export const useDevice = () => {
    const token = useDeviceStore(state => state.token);
    const uuid = useDeviceStore(state => state.uuid);
    const device = useDeviceStore(state => state.device);
    const user = useDeviceStore(state => state.user);
    const saveTokenStore = useDeviceStore(state => state.saveToken);
    const saveUser = useDeviceStore(state => state.saveUser);
    const setDevice = useDeviceStore(state => state.setDevice);

    const saveToken = (token: string) => {
        localStorage.setItem(STORAGE_TYPES.TOKEN, token);
        saveTokenStore(token);
    };

    return {
        token,
        uuid,
        device,
        user,
        saveToken,
        saveUser,
        setDevice,
    };
}