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
  wp_user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar_url: string;
  createdAt: string;
  updatedAt: string;
  billing: any;
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
