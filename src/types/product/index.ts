export interface Product {
  _id: string;
  woo_product_id: string;
  name: string;
  slug: string;
  type: string;
  status: "publish" | "private";
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: string | null;
  date_on_sale_to: string | null;
  on_sale: boolean;
  purchasable: boolean;
  images: Image[];
  categories: [
    {
      id: any;
      name: string;
      slug: string;
    }
  ];
  tags: { id: any; name: string; slug: string }[];
  detail: ProductDetail;
  __v: number;
}

export interface Image {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  src: string;
  name: string;
  alt: string;
}

export interface ProductDetail {
  _id: string;
  tax_status: string;
  tax_class: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  manage_stock: boolean;
  stock_quantity: null | number;
  backorders: "no" | "notify" | "yes";
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: null | number;
  sold_individually: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  parent_id: any;
  purchase_note: string;
  menu_order: number;
  date_created: string;
  date_modified: string;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: any;
  upsell_ids: any[];
  cross_sell_ids: any[];
  attributes: any[];
  default_attributes: any[];
  variations: any[];
  grouped_products: any[];
  related_ids: any[];
  meta_data: any[];
  __v: number;
}

export interface Category {
  _id: string;
  woo_category_id: number;
  name: string;
}
