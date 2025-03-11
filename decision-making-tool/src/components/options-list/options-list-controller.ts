import type { OptionsListModel } from './options-list-model';

import { OptionProperties } from './option-bar/option-properties';

export class OptionsListController {
  private readonly model: OptionsListModel;

  constructor(model: OptionsListModel) {
    this.model = model;
  }

  public addOption(): OptionProperties {
    const idToUse = this.model.getIdAndIncrement();
    const optionProperties = new OptionProperties(idToUse);
    this.model.addOption(optionProperties);

    return optionProperties;
  }

  public removeOption(optionId: number): void {
    this.model.removeOption(optionId);
  }

  public updateOption(optionProperties: OptionProperties): void {
    this.model.updateOptionProperties(optionProperties);
  }

  public getOptions(): OptionProperties[] {
    return this.model.getOptions();
  }
}
