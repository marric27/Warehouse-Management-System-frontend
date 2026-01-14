import { SlotCategory } from "../../common/slotCategory.enum";
import { StockUnit } from "../../goodsin/models/stockunit.model";
import { Product } from "../../products/product/product.model";

export interface Slot {
  id?: number;
  code?: string;
  pickingSequence: number;
  allowedCategory: SlotCategory;
  capacity: number;
  product?: Product;
  stockUnits?: StockUnit[];
}