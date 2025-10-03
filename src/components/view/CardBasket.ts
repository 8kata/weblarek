import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card } from "./Card";

export class CardBasket extends Card {
  protected _index: HTMLElement;
  protected _deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._index = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this._deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this._deleteButton.addEventListener('click', () => {this.events.emit('basket:delete', {id: this._deleteButton.dataset.id || ''})})
  }

  set index(value: number) {
    this.setText(this._index, String(value));
  }

  render(data?: Partial<IProduct & {index: number}>): HTMLElement {
    super.render(data);
    if (data?.index) this.index = data.index + 1;
    if (data?.id) this._deleteButton.dataset.id = data.id;
    return this.container;
  }
}