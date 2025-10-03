import { IBuyer } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export type TOrder = Partial<IBuyer> & {valid: boolean, error: string};

export class Form extends Component<TOrder> {
  protected _submitButton: HTMLButtonElement;
  protected _error: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this._submitButton = ensureElement<HTMLButtonElement>('.button[type="submit"]', this.container);
    this._error = ensureElement<HTMLElement>('.form__errors', this.container);
  }

  set valid(value: boolean) {
    this.setDisable(this._submitButton, !value);
  }

  set error(value: string) {
    this.setText(this._error, value)
  }

  render(data?: TOrder) {
    if(data?.valid !== undefined) this.valid = data.valid;
    if(data?.error !== undefined) this.error = data.error;
    return this.container
  }
}