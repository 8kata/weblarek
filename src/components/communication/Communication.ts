import { IApi, IBuyer, IOrder } from "../../types";
import { IProduct } from "../../types";
import { Basket } from "../models/Basket";
import { ProductCatalog } from "../models/ProductCatalog";

export class Communication {
  private api: IApi;
  private catalog: ProductCatalog;
  private basket: Basket;

  constructor(api: IApi, catalog: ProductCatalog, basket: Basket) {  
    this.api = api;
    this.catalog = catalog;
    this.basket = basket;
  }  
  
  getApi(): Promise<IProduct[]> {
    return this.api.get<{items:IProduct[]}>('/product/')
      .then((data) => {
        this.catalog.setProducts(data.items);
        return  data.items;
      })
      .catch(error =>{
        console.error('Не удалось загрузить каталог', error);
        return [];
      })
  }

  postApi(order: IBuyer) {
    const readyOrder: IOrder = {...order, items: this.basket.getBasket().map(item => item.id), total: this.basket.getTotalPrise()};
    this.api.post('/order', readyOrder)
      .then(()=>{
        this.basket.clearBasket()
      })
      .catch((error) =>{
         console.error('Не удалось обработать заказ', error);
      })
  }
}
