import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

type THeader = {counter: number};


export class Header extends Component<THeader> {
  protected _basketButton: HTMLButtonElement;
  protected _counter: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    
    this._basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this._counter = ensureElement<HTMLElement>('.header__basket-counter', this.container);
    this._basketButton.addEventListener('click', () => {this.events.emit('basket:open')});
  }

  set counter(value: number) {
    this.setText(this._counter, String(value));
  }

  render(data?: THeader): HTMLElement {
    return super.render(data);
  }
}