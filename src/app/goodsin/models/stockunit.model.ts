import { SlotCategory } from "../../common/slotCategory.enum";

export interface StockUnit {
    id: number;
    code: string;
    batchNumber: string;
    expirationDate: Date;
    productCode: string;
    quantity: number;
    category: SlotCategory;
    slotId?: number;
}