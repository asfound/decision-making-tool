import { View } from '~/components/view';
import { TEXTAREA_ATTRIBUTES } from '~/constants/attributes';
import { PLACEHOLDERS } from '~/constants/ui-texts';
import { textarea } from '~/utils/create-element';

import styles from './textarea.module.css';

export class Textarea extends View<'textarea'> {
  protected view: HTMLTextAreaElement;

  private readonly columns: string;

  private readonly rows: string;

  public constructor(columns: string, rows: string) {
    super();

    this.columns = columns;
    this.rows = rows;
    this.view = this.createHTML();
  }

  public getValue(): string {
    return this.view.value;
  }

  protected createHTML(): HTMLTextAreaElement {
    const textareaElement = textarea({ className: styles.textarea });

    textareaElement.placeholder = PLACEHOLDERS.TEXTAREA;

    textareaElement.setAttribute(TEXTAREA_ATTRIBUTES.COLUMNS, this.columns);
    textareaElement.setAttribute(TEXTAREA_ATTRIBUTES.ROWS, this.rows);

    return textareaElement;
  }
}
