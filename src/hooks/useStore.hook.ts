import { AxiosResponse } from "axios";
import { getProducts, uploadTransaction } from "../services";
import { useDeviceStore, useProductStore, useTransactionStore } from "../store"
import { getMetaData } from "../services/metadata.service";
import { Product, Transaction } from "../models";
import PQueue from "p-queue";
import { useDevice } from "./useDevice.hook";

export const useStore = () => {
    const products = useProductStore(state => state.products);
    const metadata = useProductStore(state => state.metadata);
    const transactions = useTransactionStore((state) => state.transactions);
    const isSyncing = useTransactionStore((state) => state.isSyncing);

    const setProducts = useProductStore(state => state.setProducts);
    const setMetadata = useProductStore(state => state.setMetadata);
    const saveTransaction = useTransactionStore(state => state.saveTransaction);
    const updateTransaction = useTransactionStore(state => state.updateTransaction);
    const setSync = useTransactionStore(state => state.setSync);
    const queue = new PQueue({ concurrency: 1 });
    const network = useDeviceStore(state => state.network);

    const fetchProducts = async () => {
        const response: AxiosResponse = await getProducts();
        const checkTransactions = (product_id: number) => {
            const unuploadedTransactions: Transaction[] = transactions.filter((transac: Transaction) => transac.status == 1);

            const transac: Transaction | undefined = unuploadedTransactions.find((transac: Transaction) => transac.orders.findIndex(order => order.product_id === product_id));

            const order = transac?.orders.find((order) => order.product_id === product_id) ?? null;

            if (order != null) {
                return order.quantity;
            }

            return 0;
        };

        if (response.data?.success && response.data.data) {
            const productsRemote = [...response.data.data];

            productsRemote.forEach((product: Product) => {
                product.stock -= checkTransactions(parseInt(product.id!));
            });

            setProducts(productsRemote);
        }
    }

    const fetchMetadata = async () => {
        const response: AxiosResponse = await getMetaData();
        if (response.data?.success) {
            setMetadata(response.data.data);
        }
    }

    const uploadTransactions = async () => {
        console.log('[uploadTransactions] network', network);
        console.log('[uploadTransactions] transactions', transactions);
        if (network.connected) {

            queue.on('completed', () => {
                setTimeout(() => setSync(false), 5000);
                fetchProducts();
            });

            const requests: any[] = transactions.filter((transac: Transaction) => transac.status == 1).map((transaction) => {
                uploadTransaction(transaction).then(() => updateTransaction({ ...transaction, status: 2 }));
            });
            console.log('[uploadTransactions] requests', requests.length);
            if (requests.length > 0) {
                setSync(true);


                requests.forEach((request) => {
                    queue.add(() => request);
                });

            } else {
                setSync(false);

            }
        }
    }

    return {
        products,
        metadata,
        transactions,
        isSyncing,
        fetchProducts,
        fetchMetadata,
        saveTransaction,
        uploadTransactions
    }
}