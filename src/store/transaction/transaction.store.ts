import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ionicStorage } from "../../utils";
import { Order, Transaction } from "../../models";
import moment from "moment";
import { getDeviceID } from "../../utils/native.utils";
import { useDeviceStore } from "../device/device.store";
import { useCartStore } from "../cart/cart.store";
const MAX_TRANSACTION = 6;

type TransactionState = {
    isSyncing: boolean;
    transactions: any[],
};

type TransactionActions = {
    saveTransaction: (orders: Order[], total: number) => any;
    updateTransaction: (transaction: Transaction) => any;
    setSync: (sync: boolean) => any;
};

const initialState: TransactionState = {
    transactions: [],
    isSyncing: false
};

const persistStorage: StateStorage = ionicStorage;

const storageOptions = {
    name: 'transactions.store',
    storage: createJSONStorage(() => persistStorage),
    partialize: (state: TransactionState & TransactionActions) => ({
        transactions: state.transactions
    })
}

export const useTransactionStore = create<TransactionState & TransactionActions>()(
    persist(
        immer((set, get) => ({
            ...initialState,
            saveTransaction: async (orders: Order[], total: number) => {
                const uuid = (await getDeviceID()).uuid;
                const transaction_code = `${uuid}_${moment().format('YYYYMMDDHHmmwwssSSS')}`;
                const user: any = useDeviceStore.getState().user;

                const transaction: Transaction = {
                    transaction_code: transaction_code,
                    user: user,
                    user_id: user.id,
                    branch_id: user.branch_id,
                    total_amount: total,
                    orders: orders.map((order) => ({ ...order, transaction_code })),
                    status: 1,
                }

                

                if(get().transactions.length > MAX_TRANSACTION) {
                    set((state) => ({
                        transactions: [...state.transactions.slice(MAX_TRANSACTION/2, state.transactions.length - 1), transaction]
                    }));
                } else {
                    set((state) => ({
                        transactions: [...state.transactions, transaction]
                    }));
                }

                useCartStore.getState().clearItems();

            },
            updateTransaction: (transaction: Transaction) => {
                set((state) => ({
                    transactions: state.transactions.map((transac: Transaction) => {
                        if (transac.transaction_code === transaction.transaction_code) {
                            return transaction;
                        }

                        return transac;
                    })
                }))
            },
            setSync: (sync: boolean) => {
                set({
                    isSyncing: sync
                });
            }
        })),
        storageOptions
    )
);