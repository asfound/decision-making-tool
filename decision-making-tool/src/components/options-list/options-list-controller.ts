import { JsonFileService } from '~/services/json-file-service';
import { LocalStorageService } from '~/services/local-storage-service';
import { TextareaService } from '~/services/textarea-service';
import { validateOptionsCount } from '~/utils/check-options-count';

import type { OptionsListModel, PastedOptionData } from './options-list-model';

import { OptionProperties } from './option-item/option-properties';

export class OptionsListController {
  private readonly model: OptionsListModel;
  private readonly fileService: JsonFileService;
  private readonly textareaService: TextareaService;
  private readonly localStorageService: LocalStorageService;

  constructor(model: OptionsListModel) {
    this.model = model;
    this.fileService = new JsonFileService();
    this.textareaService = new TextareaService();
    this.localStorageService = new LocalStorageService();

    this.getLocalStorageData();
  }

  public addOption(itemData?: PastedOptionData): OptionProperties {
    const idToUse = this.model.getIdAndIncrement();
    const optionProperties = new OptionProperties(
      idToUse,
      itemData?.title,
      itemData?.weight
    );
    this.model.addOption(optionProperties);

    this.updateLocalStorage();

    return optionProperties;
  }

  public removeOption(optionId: number): void {
    this.model.removeOption(optionId);

    this.updateLocalStorage();
  }

  public updateOption(optionProperties: OptionProperties): void {
    this.model.updateOptionProperties(optionProperties);

    this.updateLocalStorage();
  }

  public getOptions(): OptionProperties[] {
    return this.model.getOptions();
  }

  public clearList(): void {
    this.model.clearOptions();

    this.updateLocalStorage();
  }

  public saveListToFile(): void {
    const data = this.model.getListData();
    this.fileService.saveDataToFile(data);
  }

  public async loadListFromFile(): Promise<void> {
    const data = await this.fileService.loadDataFromFile();

    this.clearList();
    this.model.setListData(data);

    this.updateLocalStorage();
  }

  public pasteList(input: string): OptionProperties[] {
    const data = this.textareaService.parseTextInput(input);
    const properties = [];

    for (const itemData of data) {
      const optionProperties = this.addOption(itemData);

      properties.push(optionProperties);
    }

    this.updateLocalStorage();

    return properties;
  }

  public validateOptionsCount(): boolean {
    return validateOptionsCount(this.model.getOptions());
  }

  private updateLocalStorage(): void {
    const currentListState = this.model.getListData();
    this.localStorageService.saveListData(currentListState);
  }

  private getLocalStorageData(): void {
    const data = this.localStorageService.loadListData();

    if (data) {
      this.model.setListData(data);
    } else {
      this.addOption();
    }
  }
}
