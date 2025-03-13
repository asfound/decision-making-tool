import { SHARED_CLASSES } from '~/constants/shared-classes';
import { h1, header } from '~/utils/create-element';

import { View } from '../view';
import styles from './header.module.css';

const APP_NAME = 'Decision Making Tool';

export class HeaderView extends View<'header'> {
  protected view: HTMLElement;

  public constructor() {
    super();

    this.view = this.createHTML();
  }

  protected createHTML(): HTMLElement {
    const headingElement = h1({ className: styles.heading }, [APP_NAME]);
    headingElement.classList.add(SHARED_CLASSES.HEADING);

    return header({}, [headingElement]);
  }
}
