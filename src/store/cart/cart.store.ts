import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ionicStorage } from "../../utils";
import { Order } from "../../models";
import moment from "moment";

type CartState = {
    items: any,
};

type CartActions = {
    addToCart: (order: Order) => any;
    removeFromCart: (index: number) => any;
    updateOrder: (order: Order) => any;
    clearItems: () => void;
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
        immer((set, get) => ({
            ...initialState,
            addToCart: (order: Order) => {
                let index = get().items.findIndex((item: Order) => item.product_id === order.product_id);

                if(order.product.isDynamicPrice) {
                    index = -1;
                }

                if (index > -1) {
                    set((state) => ({
                        items: state.items.map((item: Order) => {
                            if (item.product_id === order.product_id) {
                                order.quantity += item.quantity;
                                order.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
                                return order;
                            }

                            return item;
                        })
                    }));
                } else {
                    order.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
                    set((state) => ({
                        items: [...state.items, order]
                    }));
                }
            },
            removeFromCart: (index: number) => {
                set((state) => ({
                    items: state.items.filter((item: any, i: number) => i !== index)
                }))
            },
            updateOrder: (order: Order) => {
                set((state) => ({
                    items: state.items.map((item: Order) => {
                        if (item.product_id === order.product_id) {
                            return order;
                        }
                        return item;
                    })
                }))
            },
            clearItems: () => {
                set({
                    items: []
                });
            }
        })),
        storageOptions
    )
);