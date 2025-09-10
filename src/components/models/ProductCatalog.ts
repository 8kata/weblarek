import {IProduct} from '../../types/index'

export class ProductCatalog {
  products: IProduct[];
  selectedProduct: IProduct | null;

  constructor(products: IProduct[] = [], selectedProduct: IProduct | null = null){
    this.products = products;
    this.selectedProduct = selectedProduct;
  }

  setProducts(items: IProduct[]) {
      this.products = items;
  }

  getProducts(): IProduct[]{
    return [...this.products];
  }

  getProductItem(id: string): IProduct {
   const productItem = this.products.find(item => item.id === id);
   if(!productItem) {
    throw new Error(`Товар с id "${id}" не найден`);
   }
   return productItem
  }

  setSelectedProduct(selectedItem: IProduct) {
     this.selectedProduct = selectedItem;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct 
  }
}



