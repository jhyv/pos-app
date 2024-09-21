import { StateStorage, createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { ionicStorage } from "../../utils";

type TransactionState = {
    transactions: any,
};

type TransactionActions = {
};

const initialState: TransactionState = {
    transactions: [],
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
        immer((set) => ({
            ...initialState,

        })),
        storageOptions
    )
);