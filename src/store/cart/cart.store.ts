import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ionicStorage } from "../../utils";

type CartState = {
    items: any,
};

type CartActions = {
};

const initialState: CartState = {
    items: [],
};

const persistStorage: StateStorage = ionicStorage;

const storageOptions = {
    name: 'cart.store',
    storage: createJSONStorage(() => persistStorage),
    partialize: (state: CartState & CartActions) => ({
        items: state.items
    })
}

export const useCartStore = create<CartState & CartActions>()(
    persist(
        immer((set) => ({
            ...initialState,

        })),
        storageOptions
    )
);