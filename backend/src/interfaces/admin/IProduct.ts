export enum ProductStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

export interface IProduct {
    id?: string;
    category_id?: string;
    name?: string;
    mrp_price?: number | undefined | null;
    sale_price?: number | undefined | null;
    discount_percentage?: number | undefined | null;
    description?: string;
    image?: string;
    sku?: string;
    stock_available?: number;
    hsn_code?: string;
    status?: ProductStatus;
    created_at?: Date;
    updated_at?: Date;
}