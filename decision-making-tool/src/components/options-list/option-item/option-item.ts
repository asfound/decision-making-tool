import { Button } from '~/components/button/button';
import { Input } from '~/components/input/input';
import { View } from '~/components/view';
import {
  BUTTON_ATTRIBUTES,
  INPUT_ATTRIBUTES,
  LABEL_ATTRIBUTES,
} from '~/constants/attributes';
import { BUTTON_TEXTS, PLACEHOLDERS } from '~/constants/ui-texts';
import { label, li } from '~/utils/create-element';

import { VALUES } from '../constants/options-constants';
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

  public clearChildListener: () => void = () => {};

  public onClear(): void {
    this.clearChildListener();
    this.removeElement();
  }

  protected createHTML(): HTMLLIElement {
    const idString = `#${String(this.id)}`;
    const liElement = li({ className: styles.item });

    const labelElement = label({ textContent: idString, className: styles.id });
    labelElement.setAttribute(LABEL_ATTRIBUTES.FOR, idString);

    const titleInput = new Input({
      placeholder: PLACEHOLDERS.TITLE,
      className: styles.title,
      attributes: { id: idString },
    }).getHTML();

    if (this.title) {
      titleInput.value = this.title;
    }

    titleInput.addEventListener('input', () => {
      this.title = titleInput.value;
      this.updatePropertiesInModel();
    });

    const weightInput = new Input({
      placeholder: PLACEHOLDERS.WEIGHT,
      className: styles.weight,
      attributes: {
        type: INPUT_ATTRIBUTES.TYPE_NUMBER,
      },
    }).getHTML();

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
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,

      onClick: (): void => {
        deleteButton.removeListener();
        deleteButton.removeElement();
        parent.remove();
        this.removeOptionCallback(this.id);
      },
    });

    this.clearChildListener = (): void => {
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
