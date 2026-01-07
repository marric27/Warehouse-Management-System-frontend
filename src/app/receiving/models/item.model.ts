import { ItemState } from "../../common/itemState.enum";

export interface GrnItem {
    id: number;
    code: string;
    productCode: string;
    expectedQty: number;
    receivedQty: number;
    compliantQty: number;
    notCompliantQty: number;
    state: ItemState;
    // list checking info
}