import { JsonFileService } from '~/services/json-file-service';
import { TextareaService } from '~/services/textarea-service';

import type { OptionsListModel } from './options-list-model';

import { OptionProperties } from './option-item/option-properties';

export class OptionsListController {
  private readonly model: OptionsListModel;
  private readonly fileService: JsonFileService;
  private readonly textareaService: TextareaService;

  constructor(model: OptionsListModel) {
    this.model = model;
    this.fileService = new JsonFileService();
    this.textareaService = new TextareaService();
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

  public clearList(): void {
    this.model.clearOptions();
  }

  public saveListToFile(): void {
    const data = this.model.getListData();
    this.fileService.saveDataToFile(data);
  }

  public async loadListFromFile(): Promise<void> {
    const data = await this.fileService.loadDataFromFile();

    this.clearList();
    this.model.setListData(data);
  }

  public pasteList(input: string): OptionProperties[] {
    const data = this.textareaService.parseTextInput(input);
    const properties = [];
    for (const item of data) {
      const idToUse = this.model.getIdAndIncrement();
      const optionProperties = new OptionProperties(
        idToUse,
        item.title,
        item.weight
      );

      properties.push(optionProperties);
      this.model.addOption(optionProperties);
    }

    return properties;
  }
}
