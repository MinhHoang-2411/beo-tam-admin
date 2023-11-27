export interface OrderDetail {
  cart_tax: string;
  currency: string;
  customer: {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  date_created: string;
  date_modified: string;
  detail: {
    _id: string;
    billing: Bill;
    coupon_lines: any[];
    fee_lines: any[];
    line_items: any[];
    metadata: Metadata[];
    refund: any[];
    shipping: Shipping;
    shipping_lines: ShippingLine[];
  };
  discount_tax: string;
  discount_total: string;
  payment_method: string;
  payment_method_title: string;
  shipping_tax: string;
  shipping_total: string;
  status: string;
  total: string;
  total_tax: string;
  woo_customer_id: string;
  woo_order_id: string;
  __v: number;
  _id: string;
}

export interface Order {
  cart_tax: string;
  currency: string;
  customer: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  date_created: string;
  date_modified: string;
  detail: string;
  discount_tax: string;
  discount_total: string;
  payment_method: "momo_qr_scan" | "bacs" | "cod";
  payment_method_title: string;
  shipping_tax: string;
  shipping_total: string;
  status:
    | "pending"
    | "processing"
    | "on-hold"
    | "completed"
    | "cancelled"
    | "refunded"
    | "failed"
    | "Draft";
  total: string;
  total_tax: string;
  woo_customer_id: string;
  woo_order_id: string;
  __v: number;
  _id: string;
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
  _id: string;
  name: string;
  woo_product_id: number;
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
  price: string;
  images: {
    id: string;
    src: string;
  }[];
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
