import { PLACEHOLDERS } from '~/constants/ui-texts';
import { textarea } from '~/utils/create-element';
import { View } from '~/view/view';

import styles from './textarea.module.css';

export class Textarea extends View<'textarea'> {
  protected view: HTMLTextAreaElement;

  public constructor() {
    super();

    this.view = this.createHTML();
  }

  public getValue(): string {
    return this.view.value;
  }

  protected createHTML(): HTMLTextAreaElement {
    const textareaElement = textarea({ className: styles.textarea });

    textareaElement.placeholder = PLACEHOLDERS.TEXTAREA;
    // TODO recieve attridutes in constructor
    textareaElement.setAttribute('cols', '60');
    textareaElement.setAttribute('rows', '10');

    return textareaElement;
  }
}
