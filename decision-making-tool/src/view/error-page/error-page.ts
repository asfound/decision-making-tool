import { main } from '~/utils/create-element';

import type { Page } from '../app-page/app-page';

import { View } from '../view';

export class ErrorPageView extends View<'main'> implements Page {
  protected view: HTMLElement;

  constructor() {
    super();
    this.view = this.createHTML();
  }

  public getHtmlElements(): HTMLElement[] {
    return [this.view];
  }

  protected createHTML(): HTMLElement {
    const mainElement = main({}, ['Error page']);

    return mainElement;
  }
}
