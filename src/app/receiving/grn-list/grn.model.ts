import { GrnState } from "../../common/grnState.enum";

export interface Grn {
    id: number;
    code: string;
    receivingDate: string;
    supplier: string;
    state: GrnState;
    //items: GrnItem[];
}