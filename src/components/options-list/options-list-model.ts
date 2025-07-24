import type { ListData } from '~/types/interfaces';

import { VALUES } from './constants/options-constants';
import { OptionProperties } from './option-item/option-properties';

export class OptionsListModel {
  private readonly options = new Map<number, OptionProperties>();

  private idCounter: number;

  constructor(
    idCounter: number = VALUES.INITIAL_ID,
    initialOptions: OptionProperties[] = []
  ) {
    this.idCounter = idCounter;

    for (const option of initialOptions) {
      this.addOption(option);
    }
  }

  public getOptions(): OptionProperties[] {
    return [...this.options.values()];
  }

  public addOption(option: OptionProperties): void {
    this.options.set(option.id, option);
  }

  public removeOption(id: number): void {
    this.options.delete(id);

    if (this.options.size === VALUES.EMPTY_MAP_SIZE) {
      this.resetIDCounter();
    }
  }

  public clearOptions(): void {
    this.options.clear();
    this.resetIDCounter();
  }

  public updateOptionProperties(newProperties: OptionProperties): void {
    const option = this.options.get(newProperties.id);

    if (option) {
      option.title = newProperties.title;
      option.weight = newProperties.weight;

      this.options.set(option.id, option);
    }
  }

  public getIdAndIncrement(): number {
    const currentId = this.idCounter;
    this.idCounter += VALUES.ID_INCREMENT;

    return currentId;
  }

  public getListData(): ListData {
    const list = [...this.options.values()];

    const lastId = this.idCounter;

    return { list, lastId };
  }

  public setListData(data: ListData): void {
    this.idCounter = data.lastId;

    for (const item of data.list) {
      this.options.set(
        item.id,
        new OptionProperties(item.id, item.title, item.weight)
      );
    }
  }

  private resetIDCounter(): void {
    this.idCounter = VALUES.INITIAL_ID;
  }
}
