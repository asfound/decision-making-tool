import { Button } from '~/components/button/button';
import { input, label, li } from '~/utils/create-element';
import { View } from '~/view/view';

import type { OptionProperties } from '../option-properties';

const PLACEHOLDERS = {
  title: 'Title',
  weight: 'Weight',
};

export class OptionBar extends View<'li'> {
  protected view: HTMLLIElement;

  private readonly id: number;
  private readonly title: string;
  private readonly weight: number;

  public constructor(
    { id, title, weight }: OptionProperties,
    private readonly modelCallback: (id: number) => void
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

    const weightInput = input({});
    weightInput.placeholder = PLACEHOLDERS.weight;

    if (this.weight > 0) {
      weightInput.value = String(this.weight);
    }

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
        this.modelCallback(this.id);
      },
    });

    return deleteButton.getHTML();
  }
}
