import {IProduct} from '../../types/index'

export class Basket {
  basket: IProduct[];

  constructor(basket: IProduct[] = []) {
    this.basket = basket
  }

  getBasket(): IProduct[] {
    return [...this.basket];
  }
  
  setProductItem(item: IProduct) {
    this.basket.push(item);
  }

  deleteProductItem(id: string) {
    this.basket = this.basket.filter(item => item.id !== id);
  }

  clearBasket() {
    this.basket = [];
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