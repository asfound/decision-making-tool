import { textarea } from '~/utils/create-element';
import { View } from '~/view/view';

import styles from './textarea.module.css';

const PLACEHOLDER =
  'Paste a list of new options in a CSV-like format: \n\noption_title, option_weight';

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

    textareaElement.placeholder = PLACEHOLDER;
    // ToDo recieve attridutes in constructor
    textareaElement.setAttribute('cols', '60');
    textareaElement.setAttribute('rows', '10');

    return textareaElement;
  }
}
