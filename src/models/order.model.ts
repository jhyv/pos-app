import { Base } from "./base.model";
import { Product } from "./product.model";

export interface Order extends Base {
    transaction_code?: string,
    product?: any,
    product_id: number | string,
    branch?: any,
    branch_id: number | string,
    quantity: number,
    price: number,
    status: number,
    remarks: string,
    name: string,
}

export interface OrderSummary {
    product: Product;
    quantity: number;
    price: number;
    total: number;
    product_id?: number;
}