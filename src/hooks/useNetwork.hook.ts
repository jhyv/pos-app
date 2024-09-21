import { useDeviceStore } from "../store"

export const useNetwork = () => {
    const network = useDeviceStore(state => state.network);

    return {
        network,
        isConnected: network.connected,
        type: network.connectionType
    };
}