import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

type TModal = {content?: HTMLElement};

export class Modal extends Component<TModal> {
  protected _content: HTMLElement;
  protected _closeButtons: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._content = ensureElement<HTMLElement>('.modal__content', this.container);
    this._closeButtons = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this._closeButtons.addEventListener('click', () => this.events.emit('modal:close'));
    this.container.addEventListener('click', (evt: MouseEvent) => {
      if (evt.target === this.container) {
        this.events.emit('modal:close');
      }
    })
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value)
  }

  open(): void {
    this.container.classList.add('modal_active');
  }

  close(): void {
    this.container.classList.remove('modal_active');
  }

  render(data?: TModal): HTMLElement {
    return super.render(data);
  }
}