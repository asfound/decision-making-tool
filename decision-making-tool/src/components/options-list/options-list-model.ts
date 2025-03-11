import type { OptionProperties } from './types';

export class OptionsListModel {
  private readonly options: OptionProperties[] = [];

  constructor(initialOptions: OptionProperties[] = []) {
    this.options = initialOptions;
  }

  public getOptions(): OptionProperties[] {
    return this.options;
  }

  public addOption(option: OptionProperties): void {
    this.options.push(option);
  }
}
