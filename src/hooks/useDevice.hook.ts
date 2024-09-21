import { useDeviceStore } from "../store";

export const useDevice = () => {
    const token = useDeviceStore(state => state.token);
    const uuid = useDeviceStore(state => state.uuid);

    return {
        token,
        uuid
    };
}