import { View } from '~/components/view';
import { BUTTON_ATTRIBUTES } from '~/constants/attributes';
import { BUTTON_TEXTS } from '~/constants/ui-texts';
import { dialog, div } from '~/utils/create-element';

import { Button } from '../button/button';
import styles from './modal.module.css';
export class Modal extends View<'dialog'> {
  protected view: HTMLDialogElement;

  private readonly childView: HTMLElement;

  private readonly childCallback?: () => void;

  private readonly useConfirmation: boolean;

  public constructor(
    childView: HTMLElement,
    useConfirmation: boolean,
    childCallback?: () => void
  ) {
    super();

    this.childView = childView;
    this.useConfirmation = useConfirmation;
    this.childCallback = childCallback;

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
      textContent: BUTTON_TEXTS.CLOSE,
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,

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

    if (this.useConfirmation) {
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
      textContent: BUTTON_TEXTS.CONFIRM,
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,

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

    if (!this.useConfirmation && this.childCallback) {
      this.childCallback();
    }
  }
}
