import { OptionBar } from '~/components/options-list/option-bar/option-bar';
import { ul } from '~/utils/create-element';
import { View } from '~/view/view';

import type { OptionProperties } from './option-properties';
import type { OptionsListController } from './options-list-controller';

import styles from './options-list.module.css';

export class OptionsList extends View<'ul'> {
  protected view: HTMLUListElement;
  private readonly controller: OptionsListController;

  constructor(controller: OptionsListController) {
    super();

    this.controller = controller;
    this.view = this.createHTML();
  }

  public addOption(): void {
    const optionProperties = this.controller.addOption();
    const optionElement = this.createOptionBar(optionProperties);
    this.view.append(optionElement.getHTML());
  }

  protected createHTML(): HTMLUListElement {
    const listElement = ul({ className: styles.list });

    for (const optionProperties of this.controller.getOptions()) {
      const optionElement = this.createOptionBar(optionProperties);
      listElement.append(optionElement.getHTML());
    }

    return listElement;
  }

  private createOptionBar(properties: OptionProperties): OptionBar {
    return new OptionBar(
      properties,
      this.controller.removeOption.bind(this.controller),
      this.controller.updateOption.bind(this.controller)
    );
  }
}
