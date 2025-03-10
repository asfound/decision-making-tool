import { h1, header } from '~/utils/create-element';

import { View } from '../view';

const appName = 'Decision Making Tool';

export class HeaderView extends View<'header'> {
  protected view: HTMLElement;

  public constructor() {
    super();

    this.view = this.createHTML();
  }

  protected createHTML(): HTMLElement {
    const headingElement = h1({}, [appName]);
    const headerElement = header({}, [headingElement]);

    return headerElement;
  }
}
