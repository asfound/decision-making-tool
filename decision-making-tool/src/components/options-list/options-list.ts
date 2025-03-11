import { OptionBar } from '~/components/options-list/option-bar/option-bar';
import { ul } from '~/utils/create-element';
import { View } from '~/view/view';

import type { OptionProperties } from './types';

export class OptionsList extends View<'ul'> {
  protected view: HTMLUListElement;

  constructor(private readonly optionsData: OptionProperties[]) {
    super();

    this.view = this.createHTML();
  }

  public addOption(optionProperties: OptionProperties): void {
    this.optionsData.push(optionProperties);
    const optionElement = new OptionBar(optionProperties);

    this.view.append(optionElement.getHTML());
  }

  protected createHTML(): HTMLUListElement {
    const listElement = ul({});

    for (const data of this.optionsData) {
      listElement.append(new OptionBar(data).getHTML());
    }

    return listElement;
  }
}
