import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

type TBasket = {
  list: HTMLElement[];
  total: number;
  empty: boolean
}

export class BasketView extends Component<TBasket> {
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _buyButton: HTMLButtonElement;
  protected _empty: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
    this._total = ensureElement<HTMLElement>('.basket__price', this.container);
    this._buyButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this._empty = ensureElement<HTMLElement>('.basket__empty', this.container);
    this._buyButton.addEventListener('click', () => {events.emit('order:open')});
  }

  set list(items: HTMLElement[]) {
    this._list.replaceChildren(...items);
    this.empty = items.length === 0;
  }

  set total(value: number) {
    this.setText(this._total, `${value} синапсов`);
  }

  set empty(value: boolean) {
    this.setDisable(this._buyButton, value);
    this._empty.style.display = value ? 'block' : 'none';
  }

  render(data?: TBasket): HTMLElement {
    return super.render(data);
  }
}