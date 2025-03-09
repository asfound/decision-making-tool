import { h1, header } from '~/utils/create-element';

import { BaseView } from '../base-view';

const appName = 'Decision Making Tool';

export class HeaderView extends BaseView {
  constructor() {
    super(HeaderView.createHTML());
  }

  protected static createHTML(): HTMLElement {
    const headingElement = h1({}, [appName]);
    const headerElement = header({}, [headingElement]);
    return headerElement;
  }
}
