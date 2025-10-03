import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

type TGallery = {catalog: HTMLElement[]}

export class Gallery extends Component<TGallery>{
  protected _catalog: HTMLElement;
  
  constructor(container: HTMLElement){
    super(container);

    this._catalog = ensureElement<HTMLElement>('.gallery', this.container);
  }

  set catalog(items: HTMLElement[]){
    this._catalog.replaceChildren(...items); 
  }

  render(data?: Partial<TGallery>): HTMLElement {
    if(data?.catalog) this.catalog = data.catalog
    return this.container
  }
}



