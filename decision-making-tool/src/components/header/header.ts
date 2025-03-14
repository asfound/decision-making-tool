import { HEADINGS } from '~/constants/ui-texts';
import { header } from '~/utils/create-element';

import { Heading } from '../heading/heading';
import { View } from '../view';
import styles from './header.module.css';

export class HeaderView extends View<'header'> {
  protected view: HTMLElement;

  public constructor() {
    super();

    this.view = this.createHTML();
  }

  protected createHTML(): HTMLElement {
    const headingElement = new Heading(HEADINGS.APP_NAME);

    return header({ className: styles.header }, [headingElement.getHTML()]);
  }
}
