import { OptionItem } from '~/components/options-list/option-item/option-item';
import { ERRORS } from '~/constants/errors';
import { ul } from '~/utils/create-element';
import { View } from '~/view/view';

import type { OptionProperties } from '../option-item/option-properties';
import type { OptionsListController } from '../options-list-controller';

import styles from './options-list.module.css';

export class OptionsList extends View<'ul'> {
  protected view: HTMLUListElement;
  private readonly options: Map<number, OptionItem> = new Map();
  private readonly controller: OptionsListController;

  constructor(controller: OptionsListController) {
    super();

    this.controller = controller;
    this.view = this.createHTML();
  }

  public addOption(): void {
    const optionProperties = this.controller.addOption();

    const optionElement = this.createOptionItem(optionProperties);

    this.view.append(optionElement.getHTML());
  }

  public clearList(): void {
    this.controller.clearList();
    this.clearView();
  }

  public saveListToFile(): void {
    this.controller.saveListToFile();
  }

  public loadListFromFile(): void {
    this.controller
      .loadListFromFile()
      .then((): void => {
        this.clearView();

        for (const optionProperties of this.controller.getOptions()) {
          const optionElement = this.createOptionItem(optionProperties);

          this.view.append(optionElement.getHTML());
        }
      })
      .catch(() => {
        throw new Error(ERRORS.FILE_LOAD_ERROR);
      });
  }

  public pasteList(input: string): void {
    const optionPropertiesToPaste = this.controller.pasteList(input);

    for (const optionProperties of optionPropertiesToPaste) {
      this.createAndAppendOption(optionProperties, this.view);
    }
  }

  protected createHTML(): HTMLUListElement {
    const listElement = ul({ className: styles.list });

    for (const optionProperties of this.controller.getOptions()) {
      const optionElement = this.createOptionItem(optionProperties);

      listElement.append(optionElement.getHTML());
    }

    return listElement;
  }

  private createOptionItem(properties: OptionProperties): OptionItem {
    const optionElement = new OptionItem(
      properties,
      this.controller.removeOption.bind(this.controller),
      this.controller.updateOption.bind(this.controller)
    );

    this.options.set(optionElement.id, optionElement);

    return optionElement;
  }

  private clearView(): void {
    this.view.replaceChildren();

    for (const option of this.options.values()) {
      option.onClear();
    }

    this.options.clear();
  }

  private createAndAppendOption(
    optionProperties: OptionProperties,
    parent: HTMLElement
  ): void {
    const optionElement = this.createOptionItem(optionProperties);

    parent.append(optionElement.getHTML());
  }
}
