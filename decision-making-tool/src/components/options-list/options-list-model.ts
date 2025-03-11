import { OptionProperties } from './option-properties';

export class OptionsListModel {
  private readonly options: Map<number, OptionProperties> = new Map();
  private idCounter: number;

  constructor(idCounter: number, initialOptions: OptionProperties[] = []) {
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
  }

  public removeOption(id: number): void {
    this.options.delete(id);
  }

  public getIdAndIncrement(): number {
    const currentId = this.idCounter;
    this.idCounter += 1;

    return currentId;
  }
}
