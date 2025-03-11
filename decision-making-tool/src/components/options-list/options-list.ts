import { OptionBar } from '~/components/options-list/option-bar/option-bar';
import { ul } from '~/utils/create-element';
import { View } from '~/view/view';

import type { OptionsListModel } from './options-list-model';
import type { OptionProperties } from './types';

export class OptionsList extends View<'ul'> {
  protected view: HTMLUListElement;
  private readonly model: OptionsListModel;

  constructor(model: OptionsListModel) {
    super();
    this.model = model;
    this.view = this.createHTML();
  }

  public addOption(optionProperties: OptionProperties): void {
    this.model.addOption(optionProperties);

    const optionElement = new OptionBar(optionProperties);
    this.view.append(optionElement.getHTML());
  }

  protected createHTML(): HTMLUListElement {
    const listElement = ul({});

    for (const data of this.model.getOptions()) {
      listElement.append(new OptionBar(data).getHTML());
    }

    return listElement;
  }
}
