import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ionicStorage } from "../../utils";
import { ConnectionStatus } from "@capacitor/network";

type DeviceState = {
    network: ConnectionStatus,
    token: string,
    uuid: string,
    user: any,
    device: any,
    hasHydrated: boolean,
};

type DeviceActions = {
    setNetwork: (network: any) => any,
    saveToken: (token: string) => any,
    saveUser: (user: any) => any,
    setDevice: (device: any) => any,
    checkUser: () => any,
};

const initialState: DeviceState = {
    network: {
        connected: true,
        connectionType: 'none'
    },
    token: '',
    uuid: '',
    user: null,
    device: null,
    hasHydrated: false
};

const persistStorage: StateStorage = ionicStorage;

const storageOptions = {
    name: 'device.store',
    storage: createJSONStorage(() => persistStorage),
    partialize: (state: DeviceState & DeviceActions) => ({
        network: state.network,
        uuid: state.uuid,
        user: state.user,
        device: state.device
    }),
    onRehydrateStorage: () => () => {
        useDeviceStore.setState({ hasHydrated: true });
    }
}

export const useDeviceStore = create<DeviceState & DeviceActions>()(
    persist(
        immer((set, get) => ({
            ...initialState,
            setNetwork: (network: any) => {
                set({
                    network
                });
            },
            saveToken: (token: string) => {
                set({
                    token
                });
            },
            saveUser: (user: any) => {
                set({
                    user
                });
            },
            setDevice: (device: any) => {
                set({
                    device
                })
            },
            checkUser: async () => {
                return get().user;
            }
        })),
        storageOptions
    )
);