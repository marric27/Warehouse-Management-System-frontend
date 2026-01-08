import { SalesOrderLine } from "./salesOrderLine.model";

export interface Order {
  date?: string; // "YYYY-MM-DD"
  salesOrderLineList: SalesOrderLine[];
}