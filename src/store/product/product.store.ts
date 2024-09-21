import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ionicStorage } from "../../utils";
import { Product } from "../../models/product.model";
import { getProducts } from "../../services";
import { Response } from "../../models";

type ProductState = {
    products: Product[],
};

type ProductActions = {
    getRemoteProducts: () => any;
    getLocalProducts: () => any;
};

const initialState: ProductState = {
    products: [],
};

const persistStorage: StateStorage = ionicStorage;

const storageOptions = {
    name: 'products.store',
    storage: createJSONStorage(() => persistStorage),
    partialize: (state: ProductState & ProductActions) => ({
        products: state.products
    })
}

export const useProductStore = create<ProductState & ProductActions>()(
    persist(
        immer((set, get) => ({
            ...initialState,
            getRemoteProducts: () => {
                getProducts().then((response: Response) => {
                    if (response.data?.success) {
                        set({
                            products: response.data.data
                        });
                    }
                })
            },
            getLocalProducts: () => {
                return get().products;
            }
        })),
        storageOptions
    )
);