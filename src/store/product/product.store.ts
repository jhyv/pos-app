import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ionicStorage } from "../../utils";
import { Product } from "../../models/product.model";

type ProductState = {
    products: Product[],
    metadata: any,
    hasHydrated: boolean,
};

type ProductActions = {
    getLocalProducts: () => any;
    setMetadata: (metadata: any) => any;
    setProducts: (products: any[]) => any;
};

const initialState: ProductState = {
    products: [],
    metadata: null,
    hasHydrated: false
};

const persistStorage: StateStorage = ionicStorage;

const storageOptions = {
    name: 'products.store',
    storage: createJSONStorage(() => persistStorage),
    partialize: (state: ProductState & ProductActions) => ({
        products: state.products,
        metadata: state.metadata
    }),
    onRehydrateStorage: () => () => {
        useProductStore.setState({ hasHydrated: true });
    }
}

export const useProductStore = create<ProductState & ProductActions>()(
    persist(
        immer((set, get) => ({
            ...initialState,
            getLocalProducts: () => {
                return get().products;
            },
            setMetadata: (metadata: any) => {
                set({
                    metadata
                });
            },
            setProducts: (products: any[]) => {
                set({
                    products
                })
            }
        })),
        storageOptions
    )
);