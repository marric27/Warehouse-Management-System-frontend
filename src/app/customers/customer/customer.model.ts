export interface Customer {
  id?: number;
  name: string;
  surname: string;
  shippingAddress: string;
  billingAddress: string;
  email: string;
  taxCode: string;
  customerCode?: string;
}
