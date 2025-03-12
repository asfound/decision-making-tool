import { dialog } from '~/utils/create-element';
import { View } from '~/view/view';

import { Button } from '../button/button';
export class Modal extends View<'dialog'> {
  protected view: HTMLDialogElement;

  public constructor() {
    super();

    this.view = this.createHTML();
  }

  public showModal(): void {
    this.view.showModal();
  }

  protected createHTML(): HTMLDialogElement {
    const modalWindow = dialog({});

    const closeButton = new Button({
      textContent: 'close',
      type: 'button',
      onClick: (): void => {
        closeButton.removeListener();
        modalWindow.close();
        modalWindow.remove();
      },
    });

    modalWindow.append(closeButton.getHTML());
    return modalWindow;
  }
}

// childView: HTMLElement
