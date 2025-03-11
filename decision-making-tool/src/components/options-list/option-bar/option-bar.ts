import { Button } from '~/components/button/button';
import { input, label, li } from '~/utils/create-element';
import { View } from '~/view/view';

import { OptionProperties } from './option-properties';

const PLACEHOLDERS = {
  title: 'Title',
  weight: 'Weight',
};

export class OptionBar extends View<'li'> {
  protected view: HTMLLIElement;

  private readonly id: number;
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

  protected createHTML(): HTMLLIElement {
    const idString = `#${String(this.id)}`;
    const liElement = li({});

    const labelElement = label({ textContent: idString });
    labelElement.setAttribute('for', idString);

    const titleInput = input({});
    titleInput.placeholder = PLACEHOLDERS.title;
    titleInput.setAttribute('id', idString);

    if (this.title) {
      titleInput.value = this.title;
    }

    titleInput.addEventListener('input', () => {
      this.title = titleInput.value;
      this.updatePropertiesInModel();
    });

    const weightInput = input({});
    weightInput.placeholder = PLACEHOLDERS.weight;
    weightInput.setAttribute('type', 'number');

    if (this.weight > 0) {
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
      textContent: 'delete',
      type: 'button',
      onClick: (): void => {
        deleteButton.removeElement();
        parent.remove();
        this.removeOptionCallback(this.id);
      },
    });

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
