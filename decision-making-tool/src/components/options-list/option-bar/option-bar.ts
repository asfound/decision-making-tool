import { Button } from '~/components/button/button';
import { input, label, li } from '~/utils/create-element';
import { View } from '~/view/view';

type OptionProperties = {
  id?: string;
  title?: string;
  weight?: number;
};

const PLACEHOLDERS = {
  title: 'Title',
  weight: 'Weight',
};

const BASE_ID = '1';

export class OptionBar extends View<'li'> {
  protected view: HTMLLIElement;

  private readonly id: string;
  private readonly title: string;
  private readonly weight: number;

  public constructor({
    id = BASE_ID,
    title = '',
    weight = 0,
  }: OptionProperties = {}) {
    super();

    this.id = id;
    this.title = title;
    this.weight = weight;

    this.view = this.createHTML();
  }

  protected createHTML(): HTMLLIElement {
    const liElement = li({});

    const labelElement = label({ textContent: this.id });

    const titleInput = input({});
    titleInput.placeholder = PLACEHOLDERS.title;

    if (this.title) {
      titleInput.value = this.title;
    }

    const weightInput = input({});
    weightInput.placeholder = PLACEHOLDERS.weight;

    if (this.weight > 0) {
      weightInput.value = String(this.weight);
    }

    const deleteButton = new Button({
      textContent: 'delete',
      type: 'button',
      onClick: (): void => {
        deleteButton.removeElement();
        liElement.remove();

        console.log('delete');
      },
    });

    liElement.append(
      labelElement,
      titleInput,
      weightInput,
      deleteButton.getHTML()
    );

    return liElement;
  }
}
