import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

type TGallery = {catalog: HTMLElement[]}

export class Gallery extends Component<TGallery>{
  protected _catalog: HTMLElement;
  protected _locked: HTMLElement;
  
  constructor(container: HTMLElement){
    super(container);

    this._catalog = ensureElement<HTMLElement>('.gallery', this.container);
    this._locked = ensureElement<HTMLDivElement>('.page__wrapper', this.container);
  }

  set catalog(items: HTMLElement[]){
    this._catalog.replaceChildren(...items); 
  }

  set locked(value: boolean) {
    this._locked.classList.toggle('page__wrapper_locked', value);
  }

  render(data?: Partial<TGallery>): HTMLElement {
    return super.render(data);
  }
}



