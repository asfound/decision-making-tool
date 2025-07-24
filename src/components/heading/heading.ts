import { h1 } from '~/utils/create-element';

import { View } from '../view';
import styles from './heading.module.css';

export class Heading extends View<'h1'> {
  protected view: HTMLHeadingElement;

  public constructor(private readonly textContent: string) {
    super();

    this.textContent = textContent;
    this.view = this.createHTML();
  }

  protected createHTML(): HTMLHeadingElement {
    return h1({ className: styles.heading }, [this.textContent]);
  }
}
