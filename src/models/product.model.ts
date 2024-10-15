import { Base } from "./base.model";

export interface Product
    extends Base {
    name: string;
    description?: string;
    icon?: string;
    category_id?: number;
    sub_category_id?: number;
    group_id?: number;
    branch_id?: number;
    category?: any;
    sub_category?: any;
    group?: any;
    branch?: any;
    stock: number;
    stock_warning: number;
    stock_removal: number;
    price: number;
    active: boolean;
    hasStock: boolean;
    isFeatured: boolean;
    sku?: string;
    barcode?: string;
    retail_price?: number;
    unit?: string;
    isDynamicPrice?: boolean;
}