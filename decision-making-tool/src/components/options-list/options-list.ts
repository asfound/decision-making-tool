import { OptionBar } from '~/components/options-list/option-bar/option-bar';
import { ul } from '~/utils/create-element';
import { View } from '~/view/view';

import type { OptionsListModel } from './options-list-model';

import { OptionProperties } from './option-properties';

export class OptionsList extends View<'ul'> {
  protected view: HTMLUListElement;
  private readonly model: OptionsListModel;

  constructor(model: OptionsListModel) {
    super();
    this.model = model;
    this.view = this.createHTML();
  }

  public addOption(): void {
    const idToUse = this.model.getIdAndIncrement();
    const optionProperties = new OptionProperties(idToUse);

    this.model.addOption(optionProperties);

    const optionElement = new OptionBar(
      optionProperties,
      this.model.removeOption.bind(this.model)
    );

    this.view.append(optionElement.getHTML());
  }

  protected createHTML(): HTMLUListElement {
    const listElement = ul({});

    for (const data of this.model.getOptions()) {
      const optionElement = new OptionBar(
        data,
        this.model.removeOption.bind(this.model)
      );

      listElement.append(optionElement.getHTML());
    }

    return listElement;
  }
}
