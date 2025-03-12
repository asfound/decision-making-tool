import { OptionProperties } from './option-item/option-properties';

export type ListData = {
  list: Array<{ id: number; title: string; weight: number }>;
  lastId: number;
};

const INITIAL_ID = 1;
const SIZE_OF_EMPTY_MAP = 0;
export class OptionsListModel {
  private readonly options: Map<number, OptionProperties> = new Map();
  private idCounter: number;

  constructor(
    idCounter: number = INITIAL_ID,
    initialOptions: OptionProperties[] = []
  ) {
    this.idCounter = idCounter;

    for (const option of initialOptions) {
      this.addOption(option);
    }

    if (this.options.size === SIZE_OF_EMPTY_MAP) {
      this.addOption(new OptionProperties(this.getIdAndIncrement()));
    }
  }

  public getOptions(): OptionProperties[] {
    return [...this.options.values()];
  }

  public addOption(option: OptionProperties): void {
    this.options.set(option.id, option);
    console.log([...this.options.values()]);
  }

  public removeOption(id: number): void {
    this.options.delete(id);

    if (this.options.size === SIZE_OF_EMPTY_MAP) {
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
    this.idCounter += 1;

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
    this.idCounter = INITIAL_ID;
  }
}
