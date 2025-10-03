import './scss/styles.scss';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { Communication } from './components/communication/Communication';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { ProductCatalog } from './components/models/ProductCatalog';
import { CardCatalog } from './components/view/CardCatalog';
import { CardPreview } from './components/view/CardPreview';
import { Gallery } from './components/view/Gallery';
import { Modal } from './components/view/Modal';
import { IProduct, TPayment } from './types';
import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Header } from './components/view/Header';
import { CardBasket } from './components/view/CardBasket';
import { BasketView } from './components/view/BasketView';
import { Form } from './components/view/Form';
import { AddressForm } from './components/view/AddressForm';
import { ContactsForm } from './components/view/ContactsForm';
import { Success } from './components/view/Success';

const catalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketCardContainer = ensureElement<HTMLTemplateElement>('#card-basket');
const basketContainer = ensureElement<HTMLTemplateElement>('#basket');
const addressFormContainer = ensureElement<HTMLTemplateElement>('#order');
const contactsFormContainer = ensureElement<HTMLTemplateElement>('#contacts');
const successContainer = ensureElement<HTMLTemplateElement>('#success');
const modalContainer = ensureElement<HTMLDivElement>('#modal-container');
const headerContainer = ensureElement<HTMLDivElement>('.header__container');
const wrapper = ensureElement<HTMLDivElement>('.page__wrapper');

const api = new Api(API_URL);
const events = new EventEmitter();
const productsModel = new ProductCatalog([], null, events);
const basketModel = new Basket([], events);
const communicationModel = new Communication(api, productsModel, basketModel);
const buyer = new Buyer("card", "", "", "", events);
const modal = new Modal(modalContainer, events);
const header = new Header(headerContainer, events);
const gallery = new Gallery(document.body);
const basket = new BasketView(cloneTemplate(basketContainer), events);
const addressForm= new AddressForm(cloneTemplate(addressFormContainer), events, {onClick: () => events.emit('addressForm:submit')});
const contactsForm = new ContactsForm(cloneTemplate(contactsFormContainer), events, {onClick: () => events.emit('contactsForm:submit')});
const success = new Success(cloneTemplate(successContainer), events);


// Презентер модалок
const presenterModal = () => {
  events.on('modal:open', (content: HTMLElement) => {
    if (content) {
      modal.render({content});
      modal.open();
      wrapper.classList.add('page__wrapper_locked');
    }
  });
  events.on('modal:close', () => {
    modal.close();
    wrapper.classList.remove('page__wrapper_locked');
  })
}

// Презентер каталога 
const presenterCatalog = () => {
  events.on('catalog:changed', () => {
    const cards = productsModel.getProducts().map((item) => {
      const card = new CardCatalog(cloneTemplate(catalogTemplate), {onClick: () => events.emit('card:selected', item)});
      return card.render(item);
    });
    gallery.render({catalog: cards})
  })

  events.on('card:selected', (product: IProduct) => {
    productsModel.setSelectedProduct(product);
    const inTheBasket = basketModel.inBasket(product.id);
    const card = new CardPreview(cloneTemplate(previewTemplate), {
      onClick: () => {
        if (inTheBasket) {
          events.emit('basket:delete', {id: product.id});
          events.emit('modal:close');
        } else {
          events.emit('basket:add', product);
        }
      }
    });
    const content = card.render({...product, inBasket: inTheBasket});
    events.emit('modal:open', content);
  })
}

// Презентер корзины
const presenterBasket = () => {
  events.on('basket:changed', () => {
    const cards = basketModel.getBasket().map((item, index) => {
      const card = new CardBasket(cloneTemplate(basketCardContainer), events);
      return card.render({...item, index: index, id: item.id});
    })
    basket.render({list: cards, total: basketModel.getTotalPrise(), empty: basketModel.getBasket().length === 0});
    header.render({counter: basketModel.getProductCounter()});
  });

  events.on('basket:add', (product: IProduct) => {
    basketModel.setProductItem(product);
    events.emit('modal:close');
  });

  events.on('basket:delete', (product: IProduct) => {
    basketModel.deleteProductItem(product.id);
  });

  events.on('basket:open', () => {
    events.emit('modal:open', basket.render());
  });
}

// Презентер заказа
const presenterOrder = () => {
  let form: Form = addressForm;
  events.on('order:open', () => {
    const order = buyer.getOrder();
    const validation = buyer.validateForm('addressForm');
    form = addressForm;
    addressForm.render({...order, valid: validation.isValid, error: validation.error});
    events.emit('modal:open', addressForm.render());
  });

  events.on('addressForm:submit', () => {
    const order = buyer.getOrder();
    const validation = buyer.validateForm('contactsForm');
    form = contactsForm;
    contactsForm.render({...order, valid: validation.isValid, error: validation.error});
    events.emit('modal:open', contactsForm.render());
  });

  events.on('contactsForm:submit', () => {
    const total = basketModel.getTotalPrise();
    communicationModel.postApi(buyer.getOrder());
    success.render({total});
    events.emit('modal:open', success.render());
  });

  events.on('order.address:changed', (data: {value: string}) => {
    buyer.address = data.value;
  })

  events.on('order.payment:changed', (data: {value: TPayment}) => {
    buyer.payment = data.value;
  })

  events.on('order.email:changed', (data: {value: string}) => {
    buyer.email = data.value;
  })

  events.on('order.phone:changed', (data: {value: string}) => {
    buyer.phone = data.value;
  })

  events.on('order:changed', () => {
    const order = buyer.getOrder();
    if (form === addressForm) {
      const validation = buyer.validateForm('addressForm');
      addressForm.render({...order, valid: validation.isValid, error: validation.error})
    } else {
      const validation = buyer.validateForm('contactsForm');
      contactsForm.render({...order, valid: validation.isValid, error: validation.error})
    }
  })
}

// Инициализация приложения 
const App = () => {
  presenterModal();
  presenterCatalog();
  presenterBasket();
  presenterOrder();

  communicationModel.getApi()
    .then(()=>{
      console.log('Массив товаров полученного с сервера', productsModel.getProducts());
    })
    .catch((error)=>{
      console.log('Ошибка получения товаров с сервера', error);
    })
}

// Запуск приложения 
App();