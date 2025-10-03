import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Success extends Component<{total: number}> {
  protected _total: HTMLElement;
  protected _closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._total = ensureElement<HTMLElement>('.order-success__description', this.container);
    this._closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    this._closeButton.addEventListener('click', () => {this.events.emit('modal:close')});
  }

  set total(value: number) {
    this.setText(this._total, `Списано ${value} синапсов`);
  }

  render(data?: {total: number}): HTMLElement {
    if (data?.total) this.total = data.total;
    return this.container;
  }
}
