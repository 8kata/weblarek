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
    this.setText(this._index, String(value + 1));
  }

  set id(value: number | string) {
    this._deleteButton.dataset.id = String(value);
  }

  render(data?: Partial<IProduct & {index: number}>): HTMLElement {
    return super.render(data);
  }
}