export interface ConfirmRequest {
  pickListCode: string;
  pickListItemCode: string;
  stockUnitQuantities: { [stockUnitCode: string]: number };
  errorReason: string;
  user: string;
}
