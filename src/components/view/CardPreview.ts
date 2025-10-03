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
    this.setText(this._button, value ? `Удалить из корзины` : `Купить`)
  }

  render(data?: Partial<IProduct & {inBasket?: boolean}>): HTMLElement {
    super.render(data);
    if (data?.category) this.category = data.category;
    if (data?.image) this.image = data.image;
    if (data?.description) this.description = data.description;
    if (data?.inBasket) this.inBasket = data.inBasket;
    if (data?.price === null) {
      this.setText(this._button, 'Недоступно');
      this.setDisable(this._button, true); 
    }
    return this.container
  }
}