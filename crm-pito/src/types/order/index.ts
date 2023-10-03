export interface Order {
  id: number;
  status: string;
  date_created: any;
  total: number;
  shipping_total: number;
  discount_total: string;
  customer_id: number;
  billing: Bill;
  shipping: Shipping;
  paymentMethod: string;
  payment_method: string;
  payment_method_title: string;
  customer_note: string;
  date_completed: any;
  date_paid: any;
  number: string;
  meta_data: Metadata[] | any[];
  line_items: Product[];
  tax_lines: any[];
  shipping_lines: ShippingLine[];
  fee_lines: any;
  coupon_lines: any;
  refunds: any;
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  date_created_gmt: string;
  date_modified_gmt: string;
  date_completed_gmt: any;
  date_paid_gmt: any;
  currency_symbol: any;
  _links: any;
}
export interface Bill {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}
export interface Shipping {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}
export interface Metadata {
  id: number;
  key: string;
  value: string;
}
export interface Product {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: number;
  meta_data: number;
  sku: string;
  price: number;
  image: {
    id: string;
    src: string;
  };
  parent_name: any;
}
export interface ShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  instance_id: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: [
    {
      id: number;
      key: string;
      value: string;
      display_key: string;
      display_value: string;
    }
  ];
}
