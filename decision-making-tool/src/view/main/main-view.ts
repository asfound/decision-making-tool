import type { Tag } from '~/utils/create-element';

import { main } from '~/utils/create-element';

import { View } from '../view';

export class MainView extends View<'main'> {
  protected view: HTMLElement;

  public constructor() {
    super();

    this.view = this.createHTML();
  }

  public setContent<T extends Tag>(content: View<T>): void {
    this.view.innerHTML = '';
    this.view.append(content.getHTML());
  }

  protected createHTML(): HTMLElement {
    const mainElement = main({});

    return mainElement;
  }
}
