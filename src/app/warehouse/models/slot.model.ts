import { Category } from "../../common/category.enum";
import { StockUnit } from "../../goodsin/models/stockunit.model";
import { Product } from "../../products/product/product.model";

export interface Slot {
  id?: number;
  code?: string;
  pickingSequence: number;
  category: Category;
  capacity: number;
  product?: Product;
  stockUnits?: StockUnit[];
}