import { SalesOrderLine } from "./salesOrderLine.model";

export interface Order {
  id?: number;
  code?: string;
  date?: string; // "YYYY-MM-DD"
  state?: string;
  salesOrderLineList: SalesOrderLine[];
}