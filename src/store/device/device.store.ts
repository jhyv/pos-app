import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ionicStorage } from "../../utils";
import { ConnectionStatus } from "@capacitor/network";

type DeviceState = {
    network: ConnectionStatus,
    uuid: string,
};

type DeviceActions = {
    setNetwork: (network: any) => any,
};

const initialState: DeviceState = {
    network: {
        connected: true,
        connectionType: 'none'
    },
    uuid: ''
};

const persistStorage: StateStorage = ionicStorage;

const storageOptions = {
    name: 'cart.store',
    storage: createJSONStorage(() => persistStorage),
    partialize: (state: DeviceState & DeviceActions) => ({
        network: state.network,
        uuid: state.uuid
    })
}

export const useDeviceStore = create<DeviceState & DeviceActions>()(
    persist(
        immer((set) => ({
            ...initialState,
            setNetwork: (network: any) => {
                set({
                    network
                });
            }
        })),
        storageOptions
    )
);