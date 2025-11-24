import type {Request, Response, NextFunction} from 'express';



export const sendApiResponse = (res: Response, statusCode: number, data: any, message: string = 'success'): Response => {
    return res.status(statusCode).json({
        status: statusCode,
        message,
        data,
    });
}


export const slugify = (text: string):string=>{
    return text.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "")

}


export function calculateSaleAndDiscount(opts: {
    mrp_price?: number | null | undefined;
    sale_price?: number | null | undefined;
    discount_percentage?: number | null | undefined;
}) {
    // Normalize null → undefined
    const mrp_price = opts.mrp_price ?? undefined;
    const sale_price = opts.sale_price ?? undefined;
    const discount_percentage = opts.discount_percentage ?? undefined;

    if (mrp_price === undefined && sale_price !== undefined) {
        throw new Error("mrp_price is required when sale_price is provided");
    }

    let finalSale: number | undefined = sale_price;
    let finalDiscount: number | undefined = discount_percentage;

    // Case 1: Calculate sale_price via discount
    if (mrp_price !== undefined && discount_percentage !== undefined) {
        finalSale = mrp_price - (mrp_price * discount_percentage) / 100;
    }

    // Case 2: Calculate discount via sale_price
    if (
        mrp_price !== undefined &&
        sale_price !== undefined &&
        discount_percentage === undefined
    ) {
        finalDiscount = ((mrp_price - sale_price) / mrp_price) * 100;
    }

    return {
        sale_price: finalSale,
        discount_percentage: finalDiscount
    };
}



export function generateSKU(name: string, categoryName: string) {
    const shortName = name.substring(0, 5).toUpperCase();
    const cat = categoryName.substring(0, 3).toUpperCase();
    const random = Math.floor(10000 + Math.random() * 90000);
    return `${cat}-${shortName}-${random}`;
}

