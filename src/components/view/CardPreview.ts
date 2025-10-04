import { IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";
import { categoryKey } from "./CardCatalog";

export class CardPreview extends Card {
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;
  protected _description: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: {onClick: () => void}) {
    super(container);

    this._category = ensureElement<HTMLElement>('.card__category', this.container);
    this._image = ensureElement<HTMLImageElement>('.card__image', this.container);
    this._description = ensureElement<HTMLElement>('.card__text', this.container);
    this._button = ensureElement<HTMLButtonElement>('.card__button', this.container); 

    if(this._button && actions?.onClick){
      this._button.addEventListener('click', actions.onClick);
    }
  }

  set category(value: string) {
    this.setText(this._category, value);
    for(const key in categoryMap){
      this._category.classList.toggle(
        categoryMap[key as categoryKey],
        key === value
      )
    }
  }

  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  set description(value: string) {
    this.setText(this._description, value);
  }

  set inBasket(value: boolean) {
    if (this._price.textContent === 'Бесценно') return;
    this.setText(this._button, value ? `Удалить из корзины` : `Купить`);
  }

  set price(value: number | null) {
    super.price = value;
    if (value === null) {
      this.setText(this._button, 'Недоступно');
      this.setDisable(this._button, true);
    }
  }

  render(data?: Partial<IProduct & {inBasket?: boolean}>): HTMLElement {
    return super.render(data);
  }
}