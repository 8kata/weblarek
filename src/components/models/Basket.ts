import {IProduct} from '../../types/index'
import { IEvents } from '../base/Events';

export class Basket {
  basket: IProduct[];

  constructor(basket: IProduct[] = [], protected events: IEvents) {
    this.basket = basket
  }

  getBasket(): IProduct[] {
    return [...this.basket];
  }
  
  setProductItem(item: IProduct) {
    this.basket.push(item);
    this.events.emit('basket:changed');
  }

  deleteProductItem(id: string) {
    this.basket = this.basket.filter(item => item.id !== id);
    this.events.emit('basket:changed');
  }

  clearBasket() {
    this.basket = [];
    this.events.emit('basket:changed');
  }

  getTotalPrise(): number {
    return this.basket.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  getProductCounter(): number {
   return this.basket.length;
  }

  inBasket(id:string): boolean {
   return this.basket.some(item => item.id === id);
  }
}