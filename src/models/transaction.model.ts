import { Base } from "./base.model";
import { Order } from "./order.model";

export interface Transaction extends Base {
    transaction_code?: string,
    user?: any,
    user_id: number | string,
    branch?: any,
    branch_id: number | string,
    total_amount: number,
    orders: Order[],
    status: number,
    remarks?: string,
}