import { PickListItem } from "./pickListItem.model";

export interface Picklist {
    id?: number;
    code?: string;
    releaseNumber?: string;
    customerCode?: string;
    pickListItemList?: PickListItem[];
    state: string;
}
