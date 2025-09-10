export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export type TPayment = 'card' | 'cache';
export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  image: string;
  title: string;
  description: string | null;
  category: string | null;
  price: number | null;
};

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
};

export interface IOrder extends IBuyer{
  total: number;
  items: string[];
};