export enum ProductStatus{
    ACTIVE= "active",
    INACTIVE= "inactive"

}

export interface IProduct {
    id?: string;
    category_id?: string;
    name?: string;
    mrp_price?: number;
    sale_price?: number;
    discount_percentage?: number;
    description?: string;
    image?: string;
    sku?: string;
    stock_available?: number;
    hsn_code?: string;
    status?: ProductStatus;
    created_at?: Date;
    updated_at?: Date;
}