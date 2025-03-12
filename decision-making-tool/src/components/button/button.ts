import { button } from '~/utils/create-element';
import { View } from '~/view/view';

import styles from './button.module.css';

type ButtonProperties = {
  textContent: string;
  type: HTMLButtonElement['type'];
  onClick: () => void;
};

export class Button extends View<'button'> {
  protected view: HTMLButtonElement;
  private readonly abortController = new AbortController();

  public constructor(private readonly properties: ButtonProperties) {
    super();

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
