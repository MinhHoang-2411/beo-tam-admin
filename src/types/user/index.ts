export interface ResponseLoginAdmin {
  data: {
    token: string;
    user: CurrentUser;
  };
  status?: number;
  statusText?: string;
}

export interface CurrentUser {
  email: string;
  id: number;
  name: string;
}

export interface DetailCustomer {
  _id: string;
  username: string;
  woo_user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  birthday: string;
  gender: string;
  avatar_url: string;
  createdAt: string;
  updatedAt: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
    phone: string;
  };
}

export interface DetailAdmin {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  first_name: string;
  last_name: string;
}
