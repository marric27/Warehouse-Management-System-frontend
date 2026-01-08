import { SlotCategory } from "../../common/slotCategory.enum";

export interface StockUnit {
    id: number;
    batchNumber: string;
    expirationDate: Date;
    productCode: string;
    quantity: number;
    category: SlotCategory;
    slotId?: number;
}