import { button } from '~/utils/create-element';
import { View } from '~/view/view';

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

  public removeElement(): void {
    this.abortController.abort();

    this.view.remove();
  }

  protected createHTML(): HTMLButtonElement {
    const buttonElement = button({
      textContent: this.properties.textContent,
      type: this.properties.type,
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
