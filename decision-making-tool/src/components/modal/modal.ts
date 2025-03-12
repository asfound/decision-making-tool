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

    const buttonsContainer = div({ className: styles.container });

    const closeButton = new Button({
      className: styles.closeButton,
      textContent: 'close',
      type: 'button',
      onClick: (): void => {
        this.closeModal(modalWindow, closeButton);
      },
    });

    modalWindow.addEventListener('click', (event) => {
      if (event.target === modalWindow) {
        this.closeModal(modalWindow, closeButton);
      }
    });

    modalWindow.addEventListener('cancel', () => {
      this.closeModal(modalWindow, closeButton);
    });

    buttonsContainer.append(closeButton.getHTML());

    if (this.childCallback) {
      const confirmButton = this.createConfirmButton(modalWindow, closeButton);

      buttonsContainer.append(confirmButton);
    }

    modalWindow.append(this.childView);
    modalWindow.append(buttonsContainer);

    return modalWindow;
  }

  private createConfirmButton(
    modal: HTMLDialogElement,
    closeButton: Button
  ): HTMLButtonElement {
    const confirmButton = new Button({
      textContent: 'confirm',
      type: 'button',
      onClick: (): void => {
        this.closeModal(modal, closeButton);

        if (this.childCallback) {
          this.childCallback();
        }
      },
    });

    return confirmButton.getHTML();
  }

  private closeModal(modal: HTMLDialogElement, closeButton: Button): void {
    closeButton.removeListener();
    modal.close();
    modal.remove();
  }
}
