# Проектная работа "Веб-ларек"

🧑‍💻 **Исходный код:** [Репозиторий проекта web-larek](https://github.com/8kata/weblarek.git)  
🌍 **Опубликованный проект:** [web-larek на github pages](https://8kata.github.io/weblarek/)  

Стек: HTML, SCSS, TS, Vite  
Применяемый паттерн проектирования — MVP + событийно-ориентированный подход  

Структура проекта:  
- src/ — исходные файлы проекта  
- src/components/ — папка с JS компонентами  
- src/components/base/ — папка с базовым кодом  
- src/components/communication/ — папка с классом коммуникации  
- src/components/models/ — папка с классами моделей данных  
- src/components/view/ — папка с классами интерфейса  

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.



### Базовый код

#### Класс Component


Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент, за отображение которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`  
`setText(element: HTMLElement, text: string): void` - утилитарный метод для установки текста у DOM-элементов    
`setDisable(element: HTMLElement, state: boolean): void` - утилитарный метод для переключения атрибута `disabled` у DOM-элементов     


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.



### Данные



Интерфейс товара `IProduct`: 

Поля интерфеса:   
- `id: string` — уникальный идентификатор товара  
- `image: string,` — ссылка на изображение  
- `title: string,` — название товара  
- `description: string | null,` — описание товара  
- `category: string | null ,` — категория товара  
- `price: number | null` — цена  

Интерфейс покупателя `IBuyer`: 

Поля интерфейса:  
- `payment: TPayment;` — способ оплаты содержит в себя тип `TPayment`  
- `email: string` — email покупателя  
- `phone: string` — номер телефона покупателя  
- `address: string` — адресс покупателя

Интерфейс для данных отправляемого заказа `IOrder`, расширяет интерфейс `IBuyer`:  

Поля интерфейса:  
- `total: number` —  итоговая сумма заказа  
- `items: string[]`: — массив из id купленных товаров  
- + поля `IBuyer`    



### Модель данных  



Класс `ProductCatalog` — отвечает за хранение массива товаров, и за работу с товаром выбранным для подробного отображения в карточке

Поля класса:  
- `products: IProduct[]` — массив всех товаров  
- `selectedProduct: IProduct | null` — товар выбранный для подробного отображения  

Конструктор:  
 constructor(products: IProduct[] = [], selectedProduct: IProduct | null = null, protected events: IEvents) — принимает параметры массив продуктов, выбранный продукт и  брокер событий  

Методы класса:  
- `setProducts(items: IProduct[]): void` — сохранение в поле `products` массива товаров полученного в параметрах метода и инит события изменения каталога  
- `getProducts(): IProduct[]` — возвращает массив товаров из модели  
- `getProductItem(id:string): IProduct ` — получение одного товара по его id  
- `setSelectedProduct(selectedItem:IProduct): void` — сохранения товара в поле `selectedProduct` для подробного отображения  
- `getSelectedProduct(): IProduct | null` — получение товара для подробного отображения  


Класс `Basket` — отвечает за хранение массива товаров, выбранных покупателем для покупки  

Поля класса:  
- `basket: IProduct[]` — массив товаров в корзине

Конструктор:  
  constructor(basket: IProduct[] = [], protected events: IEvents) — принимает массив с продуктами, находящимися в корзине и брокер событий   

Методы класса:  
- `getBasket(): IProduct[]` — возвращает массив товаров, которые находятся в корзине  
- `setProductItem(item: IProduct): void` — добавление товара в поле `basket`, который был получен в параметре в массив корзины  и инит события изменения корзины  
- `deleteProductItem(id: string): void` — удаление товара, полученного в параметре из массива корзины  и инит события изменения корзины   
- `clearBasket(): void` — очистка корзины и инит события изменения корзины  
- `getTotalPrise(): number` — получение стоимости всех товаров в корзине  
- `getProductCounter(): number` — получение количества товаров в корзине  
- `inBasket(id:string): boolean` — проверка наличия товара в корзине по его id, полученному в параметр метода 


Класс `Buyer` — хранит контактные данные и тип оплаты покупателя

Поля класса: 
- `payment: TPayment` — способ оплаты содержит в себя тип `TPayment`  
- `address: string` — адресс  
- `phone: string` — номер телефона  
- `email: string` — email

Конструктор:  
  constructor(payment: TPayment = 'card', address: string = "", phone: string = "", email: string = "", protected events: IEvents) — принимает тип оплаты и контактные данные, тип оплаты по умолчанию `card` и брокер событий   

Методы класса:  
- `set payment(value: TPayment): void` —  сохранение данных в поле `payment` + инит события изменения заказа  
- `set address(value: string): void` — сохранениие данных в поле `address` + инит события изменения заказа  
- `set phone(value: string): void` — сохранеине данных в поле `phone` + инит события изменения заказа  
- `set email(value: string): void` — сохранеине данных в поле `email` + инит события изменения заказа  
- `getOrder(): IBuyer` — получение всех данных покупателя  
- `clearOrder(): void` — очистка данных покупателя  
- `validateForm(): boolean` — валидация данных  



### Слой комуникации  



Класс `Communication` — отвечает за коммуникацию приложения и сервера, использует композицию с классом `Api`, реализующим интерфейс `IApi` и экземпляры классов `ProductCatalog` и `Basket`   

Поля класса:  
- `private api: IApi` —  поле, в котором хранится экземпляр класса `Api`  
- `private catalog: ProductCatalog` —  поле, в котором хранится экземпляр класса `ProductCatalog`  
- `private basket: Basket` —  поле, в котором хранится экземпляр класса `Basket`  

constructor(api: IApi, catalog: ProductCatalog, basket: Basket) {  
  this.api = api;   
  this.catalog = catalog;  
  this.basket = basket;  
}  

Методы класса:  
- `getApi(): Promise<IProduct[]> ` —  осуществление GET - запроса к серверу для  получения массива товаров и записи их в поле `products` модели данных  
- `postApi(order: IOrder): void` —  осуществление  POST - запроса на сервер для отправки данных готового заказа  



### Слой отображения    



Класс `Modal` — отвечает за контроль состояния всех модалок в приложении и изменение их содержимого, расширяет класс `Component<TModal>`    

Поля класса:  
- `protected _content: HTMLElement` —  содержимое модалки      
- `protected _closeButtons: HTMLButtonElement` —  кнопка закрытия модалки  

constructor(container: HTMLElement, protected events: IEvents) {  
  super(container);  
}  - как и во всех последующих классах отображения, в конструкторе обязательно вызывается родительский конструктор, а также происходит поиск и запись в поля класса нужных DOM-элементов и навешивание слушателей, если это требуется  

Сеттеры класса:  
- `set content(value: HTMLElement)` —  устанавливает значение контента модалки    

Методы класса:   
- `open(): void` —  добавление класса открытой модалки    
- `close(): void` —  снятие класса открытой модалки  

render(data?: TModal): HTMLElement {  
  return super.render(data);    
} - модифицированный родительский метод, как и у последующих классов представления, вызывает родительский рендер и обновляет поля класса с переданным в параметры содержимым  


Класс `Header` — отвечает за шапку приложения и контролирует состояние счетчика корзины, расширяет класс `Component<THeader>`    

Поля класса:  
- `protected _basketButton: HTMLButtonElement` —  кнопка корзинки        
- `protected _counter: HTMLElement` —  счетчик товаров в корзине   

constructor(container: HTMLElement, protected events: IEvents) {  
  super(container);  
}   

Сеттеры класса:  
- `set counter(value: number)` —  устанавливает значение счетчика корзинки      

Методы класса:   

render(data?: THeader): HTMLElement {  
  return super.render(data);  
}   


Класс `Gallery` — отвечает за галерею приложения и устанавливает в нее актуальный каталог с карточками, также контролирует состояние прокрутки страницы, расширяет класс `Component<TGallery>`    

Поля класса:  
- `protected _catalog: HTMLElement` —  каталог, в который будут вставляться товары     
- `protected _locked: HTMLElement` —  поле с состоянием прокрутки страницы      

constructor(container: HTMLElement) {  
  super(container);  
}  - в классе не эмитятся никакие события, поэтому передаем в параметры только контейнер с разметкой  

Сеттеры класса:  
- `set catalog(items: HTMLElement[])` —  устанавливает значение каталога    
- `set locked(value: boolean)` —  устанавливает значение прокрутки страницы        

Методы класса:   

render(data?: Partial<TGallery>): HTMLElement {  
  return super.render(data);   
}   


Класс `BasketView` — отвечает за интерфейс корзины приложения и контролирует состояние пустой корзины, расширяет класс `Component<TBasket>`    

Поля класса:  
- `protected _list: HTMLElement` —  список для товаров в корзине         
- `protected _total: HTMLElement` —  итоговая сумма товаров в корзине   
- `protected _buyButton: HTMLButtonElement` —  кнопка купить для перехода к оформлению заказа     
- `protected _empty: HTMLElement` —  флаг состояния для пустой корзины  

constructor(container: HTMLElement, protected events: IEvents) {  
  super(container);  
}   

Сеттеры класса:  
- `set list(items: HTMLElement[])` —  устанавливает значение списка товаров корзины      
- `set total(value: number)` —  устанавливает значение суммы  товаров корзины  
- `set empty(value: boolean)` —  устанавливает состояние пустой корзины  

Методы класса:   

render(data?: TBasket): HTMLElement {  
  return super.render(data);    
}   


Класс `Card` — отвечает за карточку товара. Родительский класс для всех трех вариаций товара, расширяет класс `Component<IProduct>`    

Поля класса:  
- `protected _title: HTMLElement` —  название товара, есть у всех вариаций товара           
- `protected _price: HTMLElement` —  цена товара,  есть у всех вариаций товара  
- `private _titleText = ''` —  приватное поле для названия, чтобы использовать его в альтернативном описании изображения      

constructor(container: HTMLElement) {  
  super(container);  
} - в классе не эмитятся никакие события, поэтому передаем в параметры только контейнер с разметкой   

Сеттеры и геттер класса:  
- `set title(value: string)` —  устанавливает значение названия товара   
- `set price(value: number | null)` —  устанавливает значение цены товара  
- `get title(): string` —  возвращает значение поля названия карточки    

Методы класса:   

render(data?: Partial<IProduct>): HTMLElement {  
  return super.render(data);   
}  


Класс `CardCatalog` — отвечает за интерфейс карточки в каталоге и устанавливает значения категории и изображения товара, расширяет класс `Card`     

Поля класса:  
- `protected _category: HTMLElement` —  категория товара  
- `protected _image: HTMLImageElement` —  изображение товара  

constructor(container: HTMLElement, actions?: {onClick: () => void}) {  
  super(container);  

  if(actions?.onClick){  
    this.container.addEventListener('click', actions.onClick);  
  }  
}   

Сеттеры класса:  
- `set category(value: string)` —  устанавливает значение категории и добавляет элементу нужный класс для категории  
- `set image(value: string)` —  устанавливает изображение, его путь и альтернативное описание  

Методы класса:   

render(data?: Partial<IProduct>): HTMLElement {  
  return super.render(data);   
}    


Класс `CardPreview` — отвечает за интерфейс превью карточки и устанавливает значения категории, изображения, описания, наличия в корзине товара, расширяет класс `Card`     

Поля класса:  
- `protected _category: HTMLElement` —  категория товара  
- `protected _image: HTMLImageElement` —  изображение товара  
- `protected _description: HTMLElement` —  описание товара    
- `protected _button: HTMLButtonElement` —  кнопка купить/удалить из корзины   

constructor(container: HTMLElement, actions?: {onClick: () => void}) {  
  super(container);  

  if(this._button && actions?.onClick){
    this._button.addEventListener('click', actions.onClick);
  }
}   

Сеттеры класса:  
- `set category(value: string)` —  устанавливает значение категории и добавляет элементу нужный класс для категории  
- `set image(value: string)` —  устанавливает изображение, его путь и альтернативное описание  
- `set description(value: string)` —  устанавливает описание товара  
- `set inBasket(value: boolean)` —  устанавливает состояние наличия товара в корзине  
- `set price(value: number | null)` —  устанавливает цену товара и обрабатывает случай с бесценным товаром    

Методы класса:   

render(data?: Partial<IProduct & {inBasket?: boolean}>): HTMLElement {  
  return super.render(data);   
}   



Класс `CardBasket` — отвечает за интерфейс карточки товара в корзине и устанавливает значение индекса, расширяет класс `Card`     

Поля класса:  
- `protected _index: HTMLElement` —  порядковый номер товара    
- `protected _deleteButton: HTMLButtonElement` —  кнопка удаления товара из корзины    

constructor(container: HTMLElement, protected events: IEvents) {  
  super(container);  
}   

Сеттеры класса:  
- `set index(value: number)` —  устанавливает значение индекса товара  
- `set id(value: number | string)` —  устанавливает значение id товара   

Методы класса:   

render(data?: Partial<IProduct & {index: number}>): HTMLElement {  
  return super.render(data);  
}    


Класс `Form` — отвечает за формы оформления заказа. Родительский класс для двух форм, расширяет класс `Component<TOrder>`   
type TOrder = Partial<IBuyer> & {valid: boolean, error: string} - тип объекта, который принимает рендер, к интерфейсу покупателя добавляются флаг валидности и сообщения валидации  

Поля класса:  
- `protected _submitButton: HTMLButtonElement` —  кнопка с действием далее/оплатить, есть у всех форм         
- `protected _error: HTMLElement` —  контейнер для сообщений валидации,  есть у всех форм   

constructor(container: HTMLElement) {  
  super(container);  
} - в классе не эмитятся никакие события, поэтому передаем в параметры только контейнер с разметкой   

Сеттеры и геттер класса:  
- `set valid(value: boolean)` —  устанавливает значение валидности формы    
- `set error(value: string)` —  устанавливает сообщение валидации  

Методы класса:   

render(data?: TOrder) {  
  return super.render(data);   
}  


Класс `AddressForm` — отвечает за интерфейс формы с типом оплаты и адресом и устанавливает их значения, расширяет класс `Form`     

Поля класса:  
- `protected _addressInput: HTMLInputElement` —  поле с адресом     
- `protected _paymentButtons: HTMLButtonElement[]` —  кнопки с видом оплаты    

constructor(container: HTMLElement, protected events: IEvents, actions?: {onClick: () => void}) {  
  super(container);  
}   - помимо контейнера с разметкой и брокера событий, в конструктор также передается объект экшнс, в который в презентере передается колбэк в качестве эмита нужного сабмита   

Сеттеры класса:  
- `set payment(value: TPayment)` —  устанавливает вид оплаты    
- `set address(value: string)` —  устанавливает значение адреса  

Методы класса:   

render(data?: TOrder): HTMLElement {  
  return super.render(data);  
}     


Класс `ContactsForm` — отвечает за интерфейс формы с контактными данными и устанавливает их значения, расширяет класс `Form`     

Поля класса:  
- `protected _emailInput: HTMLInputElement` —  поле с емэйл    
- `protected _phoneInput: HTMLInputElement` —  поле с телефоном     

constructor(container: HTMLElement, protected events: IEvents, actions?: {onClick: () => void}) {  
  super(container);  
}   - помимо контейнера с разметкой и брокера событий, в конструктор также передается объект экшнс, в который в презентере передается колбэк в качестве эмита нужного сабмита   

Сеттеры класса:  
- `set email(value: string)` —  устанавливает значение емэйл      
- `set phone(value: string)` —  устанавливает значение телефона  

Методы класса:   

render(data?: TOrder): HTMLElement {  
  return super.render(data);   
}    


Класс `Success` — отвечает за интерфейс успешного оформления заказа и устанавливает значение итоговой суммы списания, расширяет класс `Component<{total: number}>`    

Поля класса:  
- `protected _total: HTMLElement` —  поле для сообщения с итоговой суммой         
- `protected _closeButton: HTMLButtonElement` —  кнопка для продолжения покупок  

constructor(container: HTMLElement, protected events: IEvents) {  
  super(container);  
}   

Сеттеры класса:  
- `set total(value: number)` —  устанавливает значение итоговой суммы списания  

Методы класса:   

render(data?: {total: number}): HTMLElement {  
  return super.render(data);   
}   


### Слой презентера    


код презентера находится в главном файле приложения `src/main.ts` и логически разделен на отдельные презентеры   

- `presenterModal` —  отвечает за обработку состояния модалок приложения   
'modal:open' -  рендерит модалку с переданным содержимым и открывает ее, запрещает прокрутку страницы  
'modal:close' - закрывает модалку и возобновляет прокрутку  

- `presenterCatalog` —  отвечает за обработку событий каталога и превью карточки выбранного товара   
'catalog:changed' -  рендерит каталог при его изменении с актуальным содержимым   
'card:selected' - устанавливает выбранный товар в продуктовую модель, исходя из наличия товара в корзине предопределяет следующие действия с товаром, рендерит превью-карточку и отображает ее  

- `presenterBasket` —  отвечает за обработку событий корзины  
'basket:changed' -  рендерит корзину при ее изменении с актуальным содержимым, а также рендерит шапку приложения с актуальным счетчиком товаров в корзине  
'basket:add' -  добавляет товар в корзину  
'basket:delete' -  удаляет товар из корзины   
'basket:open' - открывает модалку с актуальным содержимым корзины  

- `presenterOrder` —  отвечает за обработку событий заказа, перенаправляет события, исходя из выбранной формы   
'order:open' -  открывает модалку адресной формы с отрендеренным содержимым  
'addressForm:submit' - открывает модалку контактной формы с отрендеренным содержимым  
'contactsForm:submit' - отправляет пост-запрос на сервер с подготовленным коммуникационной моделью заказом, рендерит модалку успешного оформления и открывает ее  
'order.address:changed' - устанавливает актуальное значение в поле адреса модели покупателя  
'order.payment:changed' - устанавливает актуальное значение способа оплаты в модель покупателя  
'order.email:changed' - устанавливает актуальное значение в поле емэйл модели покупателя  
'order.phone:changed' - устанавливает актуальное значение в поле телефона модели покупателя  
'order:changed' -  обновляет состояние форм с актуальными данными и валидацией   
