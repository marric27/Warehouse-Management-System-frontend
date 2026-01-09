export interface PickListItem {
    id?: number;
    code?: string;
    productCode?: string;
    state?: string;
    quantity?: number;
    pickedQty?: number;
    pickingSequence?: number;
    errorReason?: string;
    slotCode?: string;
    salesOrderCode?: string;
    salesOrderLineNumber?: number;
}