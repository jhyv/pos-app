import { AxiosResponse } from "axios";
import { getProducts } from "../services";
import { useProductStore, useTransactionStore } from "../store"
import { getMetaData } from "../services/metadata.service";

export const useStore = () => {
    const products = useProductStore(state => state.products);
    const metadata = useProductStore(state => state.metadata);
    const transactions = useTransactionStore((state) => state.transactions);

    const setProducts = useProductStore(state => state.setProducts);
    const setMetadata = useProductStore(state => state.setMetadata);
    const saveTransaction = useTransactionStore(state => state.saveTransaction);


    const fetchProducts = async () => {
        const response: AxiosResponse = await getProducts();

        if (response.data?.success && response.data.data) {
            setProducts(response.data.data);
        }
    }

    const fetchMetadata = async () => {
        const response: AxiosResponse = await getMetaData();
        if (response.data?.success) {
            setMetadata(response.data.data);
        }
    }

    return {
        products,
        metadata,
        transactions,
        fetchProducts,
        fetchMetadata,
        saveTransaction,
    }
}