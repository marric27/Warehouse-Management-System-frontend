import { GrnState } from "../../common/grnState.enum";
import { GrnItem } from "./item.model";

export interface Grn {
    id: number;
    code: string;
    receivingDate: string;
    supplier: string;
    state: GrnState;
    items: GrnItem[];
}