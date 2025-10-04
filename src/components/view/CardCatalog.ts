import { IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

export type categoryKey = keyof typeof categoryMap;

export class CardCatalog extends Card {
  protected _category: HTMLElement;
  protected _image: HTMLImageElement;
  
  constructor(container: HTMLElement, actions?: {onClick: () => void}) {
    super(container);

    if(actions?.onClick){
      this.container.addEventListener('click', actions.onClick);
    }

    this._category = ensureElement<HTMLElement>('.card__category', this.container);
    this._image = ensureElement<HTMLImageElement>('.card__image', this.container);
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

  render(data?: Partial<IProduct>): HTMLElement {
    return super.render(data);
  }
}