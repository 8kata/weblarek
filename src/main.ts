import { Api } from './components/base/Api';
import { Communication } from './components/communication/Communication';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Bayer';
import { ProductCatalog } from './components/models/ProductCatalog';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const productsModel = new ProductCatalog();
productsModel.setProducts(apiProducts.items);
console.log('Массив товаров из каталога: ', productsModel.getProducts());
console.log('Товар из каталога: ', productsModel.getProductItem(apiProducts.items[0].id));
productsModel.setSelectedProduct(apiProducts.items[1]);
console.log('Выбранный товар:', productsModel.getSelectedProduct());

const basketItems = [apiProducts.items[2], apiProducts.items[3]];
const basketModel = new Basket(basketItems);
console.log('Товары в корзине:', basketModel.getBasket());
basketModel.setProductItem(apiProducts.items[1]);
console.log('Товары в корзине с добавленным товаром:', basketModel.getBasket());
console.log(basketModel.getTotalPrise());
console.log(basketModel.getProductCounter());
console.log(basketModel.inBasket(apiProducts.items[3].id));
basketModel.deleteProductItem(apiProducts.items[1].id);
console.log('Корзина без удаленного товара:', basketModel.getBasket());
basketModel.clearBasket();
console.log('Очищенная корзина:', basketModel.getBasket());


const buyerModel = new Buyer();
buyerModel.payment = 'cache';
buyerModel.address = 'Носовихенское шоссе, 4';
buyerModel.phone = '';
buyerModel.email = 'Artemic@mail.ru';
console.log('Контактная информация: ', buyerModel.getOrder());
buyerModel.clearOrder();
console.log('Контактная информация после очистки: ', buyerModel.getOrder());
console.log('Валидация полей Адресной формы :' , buyerModel.validateForm('addressForm'));
buyerModel.email = 'Artemka@mail.ru';
console.log('Валидация полей Контактной формы:' , buyerModel.validateForm('contactsForm'));
buyerModel.phone = '+79885675401';
console.log('Валидация полей Контактной формы при указании всех полей:' , buyerModel.validateForm('contactsForm'));

const communicationModel = new Communication(new Api(API_URL), productsModel, basketModel);
communicationModel.getApi()
.then(()=>{
  console.log('Массив товаров полученного с сервера', productsModel.getProducts());
});
buyerModel.address = 'Носовихенское шоссе, 4';
basketModel.setProductItem(apiProducts.items[1]);
communicationModel.postApi(buyerModel.getOrder());








