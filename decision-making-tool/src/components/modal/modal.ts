import { dialog, div } from '~/utils/create-element';
import { View } from '~/view/view';

import { Button } from '../button/button';
import styles from './modal.module.css';
export class Modal extends View<'dialog'> {
  protected view: HTMLDialogElement;
  private readonly childView: HTMLElement;
  private readonly childCallback?: () => void;

  public constructor(childView: HTMLElement, childCallback?: () => void) {
    super();

    this.childCallback = childCallback;
    this.childView = childView;
    this.view = this.createHTML();
  }

  public showModal(): void {
    this.view.showModal();
  }

  protected createHTML(): HTMLDialogElement {
    const modalWindow = dialog({ className: styles.modal });
    modalWindow.append(this.childView);

    const buttonsContainer = div({ className: styles.container });

    const closeButton = new Button({
      className: styles.closeButton,
      textContent: 'close',
      type: 'button',
      onClick: (): void => {
        closeButton.removeListener();
        modalWindow.close();
        modalWindow.remove();
      },
    });

    buttonsContainer.append(closeButton.getHTML());

    if (this.childCallback) {
      const confirmButton = new Button({
        textContent: 'confirm',
        type: 'button',
        onClick: (): void => {
          closeButton.removeListener();
          modalWindow.close();
          modalWindow.remove();

          if (this.childCallback) {
            this.childCallback();
          }
        },
      });

      buttonsContainer.append(confirmButton.getHTML());
    }

    modalWindow.append(buttonsContainer);
    return modalWindow;
  }
}
