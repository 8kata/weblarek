import { TPayment } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form, TOrder } from "./Form";

export class AddressForm extends Form {
  protected _addressInput: HTMLInputElement;
  protected _paymentButtons: HTMLButtonElement[];

  constructor(container: HTMLElement, protected events: IEvents, actions?: {onClick: () => void}) {
    super(container);

    this._addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
    this._paymentButtons = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);

    if(actions?.onClick){
      this.container.addEventListener('submit', (evt) => {
        evt.preventDefault();
        actions.onClick();
      })
    }

    this._addressInput.addEventListener('input', () => {this.events.emit('order.address:changed', {value: this._addressInput.value})});

    this._paymentButtons.forEach(button => {
      button.addEventListener('click', () => {this.events.emit('order.payment:changed', {value: button.name as TPayment})});
    })
  }

  set payment(value: TPayment) {
    this._paymentButtons.forEach(button => {
      button.classList.toggle('button_alt-active', button.name === value);
    })
  }

  set address(value: string) {
    this._addressInput.value = value ?? '';
  }

  render(data?: TOrder): HTMLElement {
    super.render(data);
    if (data?.payment) this.payment = data.payment;
    if (data?.address) this.address = data.address;
    return this.container
  }
}