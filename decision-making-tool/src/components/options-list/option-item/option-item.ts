import { Button } from '~/components/button/button';
import { BUTTON_TEXTS, PLACEHOLDERS } from '~/constants/ui-texts';
import { input, label, li } from '~/utils/create-element';
import { View } from '~/view/view';

import { VALUES } from '../constants/constants';
import styles from './option-item.module.css';
import { OptionProperties } from './option-properties';

export class OptionItem extends View<'li'> {
  public readonly id: number;

  protected view: HTMLLIElement;

  private title: string;
  private weight: number;

  public constructor(
    { id, title, weight }: OptionProperties,
    private readonly removeOptionCallback: (id: number) => void,
    private readonly updateOptionCallback: (
      properties: OptionProperties
    ) => void
  ) {
    super();

    this.id = id;
    this.title = title;
    this.weight = weight;

    this.view = this.createHTML();
  }

  public buttonCallback: () => void = () => {};

  public onClear(): void {
    this.buttonCallback();
    this.removeElement();
  }

  protected createHTML(): HTMLLIElement {
    const idString = `#${String(this.id)}`;
    const liElement = li({ className: styles.item });

    const labelElement = label({ textContent: idString, className: styles.id });
    labelElement.setAttribute('for', idString);

    const titleInput = input({ className: styles.title });
    titleInput.placeholder = PLACEHOLDERS.TITLE;
    titleInput.setAttribute('id', idString);

    if (this.title) {
      titleInput.value = this.title;
    }

    titleInput.addEventListener('input', () => {
      this.title = titleInput.value;
      this.updatePropertiesInModel();
    });

    const weightInput = input({ className: styles.weight });
    weightInput.placeholder = PLACEHOLDERS.WEIGHT;
    weightInput.setAttribute('type', 'number');

    if (this.weight > VALUES.EMPTY_QUANTITY) {
      weightInput.value = String(this.weight);
    }

    weightInput.addEventListener('input', () => {
      this.weight = Number(weightInput.value);
      this.updatePropertiesInModel();
    });

    const deleteButton = this.createDeleteButton(liElement);

    liElement.append(labelElement, titleInput, weightInput, deleteButton);

    return liElement;
  }

  private createDeleteButton(parent: HTMLLIElement): HTMLButtonElement {
    const deleteButton = new Button({
      textContent: BUTTON_TEXTS.DELETE,
      type: 'button',
      onClick: (): void => {
        deleteButton.removeListener();
        deleteButton.removeElement();
        parent.remove();
        this.removeOptionCallback(this.id);
      },
    });

    this.buttonCallback = (): void => {
      deleteButton.removeListener();
    };

    return deleteButton.getHTML();
  }

  private updatePropertiesInModel(): void {
    const currentProperties = new OptionProperties(
      this.id,
      this.title,
      this.weight
    );

    this.updateOptionCallback(currentProperties);
  }
}
