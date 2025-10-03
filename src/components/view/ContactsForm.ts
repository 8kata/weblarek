import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form, TOrder } from "./Form";

export class ContactsForm extends Form {
  protected _emailInput: HTMLInputElement;
  protected _phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, protected events: IEvents, actions?: {onClick: () => void}) {
    super(container);

    this._emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this._phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

    if(actions?.onClick){
      this.container.addEventListener('submit', (evt) => {
        evt.preventDefault();
        actions.onClick();
      })
    }

    this._emailInput.addEventListener('input', () => {this.events.emit('order.email:changed', {value: this._emailInput.value})});
    this._phoneInput.addEventListener('input', () => {this.events.emit('order.phone:changed', {value: this._phoneInput.value})});
  }

  set email(value: string) {
    this._emailInput.value = value ?? '';
  }

  set phone(value: string) {
    this._phoneInput.value = value ?? '';
  }

  render(data?: TOrder): HTMLElement {
    super.render(data);
    if (data?.email) this.email = data.email;
    if (data?.phone) this.phone = data.phone;
    return this.container
  }
}