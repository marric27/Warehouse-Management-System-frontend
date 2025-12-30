import { SlotCategory } from "../../common/slotCategory.enum";

export interface Slot {
  id?: number;
  code?: string;
  pickingSequence: number;
  allowedCategory: SlotCategory;
  capacity: number;
  //product?: Product;
  //stockUnits?: StockUnit[];
}