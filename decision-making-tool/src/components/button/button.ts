import type { ButtonProperties } from '~/types/interfaces';

import { View } from '~/components/view';
import { button } from '~/utils/create-element';

import styles from './button.module.css';

export class Button extends View<'button'> {
  protected view: HTMLButtonElement;

  private readonly abortController = new AbortController();

  private readonly properties: ButtonProperties;

  public constructor(properties: ButtonProperties) {
    super();

    this.properties = properties;
    this.view = this.createHTML();
  }

  public removeListener(): void {
    this.abortController.abort();
  }

  protected createHTML(): HTMLButtonElement {
    const buttonElement = button({
      textContent: this.properties.textContent,
      type: this.properties.type,
      className: styles.button,
    });

    if (this.properties.className) {
      buttonElement.classList.add(this.properties.className);
    }

    if (this.properties.actionButton) {
      buttonElement.classList.add(styles.actionButton);
    }

    buttonElement.addEventListener(
      'click',
      () => {
        this.properties.onClick();
      },
      { signal: this.abortController.signal }
    );

    return buttonElement;
  }
}
