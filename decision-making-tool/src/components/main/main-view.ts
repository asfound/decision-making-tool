import { main } from '~/utils/create-element';

import { BaseView } from '../base-view';

export class MainView extends BaseView {
  constructor() {
    super(MainView.createHTML());
  }

  private static createHTML(): HTMLElement {
    const mainElement = main({});

    return mainElement;
  }

  public setContent(content: BaseView): void {
    this.element.innerHTML = '';
    this.element.append(content.getHTML());
  }
}
