import { OptionProperties } from './option-properties';

const INITIAL_ID = 1;
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

    if (this.options.size === 0) {
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

    if (this.options.size === 0) {
      this.resetIDCounter();
    }
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

  private resetIDCounter(): void {
    this.idCounter = INITIAL_ID;
  }
}
