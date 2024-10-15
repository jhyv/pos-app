import { STORAGE_TYPES } from "../contants";
import { registerDevice } from "../services";
import { useDeviceStore } from "../store";

export const useDevice = () => {
    const token = useDeviceStore(state => state.token);
    const uuid = useDeviceStore(state => state.uuid);
    const device = useDeviceStore(state => state.device);
    const user = useDeviceStore(state => state.user);
    const network = useDeviceStore(state => state.network);

    const saveTokenStore = useDeviceStore(state => state.saveToken);
    const saveUser = useDeviceStore(state => state.saveUser);
    const setDevice = useDeviceStore(state => state.setDevice);
    const checkUser = useDeviceStore(state => state.checkUser);
    const setNetwork = useDeviceStore(state => state.setNetwork);

    const saveToken = (token: string) => {
        saveTokenStore(token);
        localStorage.setItem(STORAGE_TYPES.TOKEN, token);
    };

    const setupDevice = (device: any) => {
        return registerDevice(1, device);
    }

    return {
        token,
        uuid,
        device,
        user,
        network,
        saveToken,
        saveUser,
        setDevice,
        setupDevice,
        setNetwork,
        checkUser
    };
}