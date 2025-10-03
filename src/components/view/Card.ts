import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Card extends Component<IProduct> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  private _titleText = '';

  constructor(container: HTMLElement) { 
    super(container);

    this._title = ensureElement<HTMLElement>('.card__title', this.container);
    this._price = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set title(value: string) {
    this.setText(this._title, value);
    this._titleText = value;
  }

  set price(value: number | null) {
    const priceText = value ? `${value} синапсов` : `Бесценно`;
    this.setText(this._price, priceText);
  }

  get title(): string {
    return this._titleText;
  }

  render(data?: Partial<IProduct>): HTMLElement {
    if (data?.title) this.title = data.title;
    if (data?.price !== undefined) this.price = data.price;
    return this.container;
  }
}

