import { Category } from "../../common/category.enum";

export interface StockUnit {
    id: number;
    code: string;
    batchNumber: string;
    expirationDate: Date;
    productCode: string;
    quantity: number;
    category: Category;
    slotId?: number;
}