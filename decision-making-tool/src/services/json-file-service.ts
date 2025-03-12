import type { ListData } from '~/components/options-list/options-list-model';

import { isListData } from '~/utils/type-guards';
const FIRST_FILE_INDEX = 0;

import { a, input } from '~/utils/create-element';
export class JsonFileService {
  public saveDataToFile(data: ListData): void {
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });

    const link = a({});

    link.href = URL.createObjectURL(blob);
    link.download = 'options-list-asfound.json';
    link.click();
  }

  public async loadDataFromFile(): Promise<ListData> {
    const inputElement = input({});
    inputElement.type = 'file';
    inputElement.accept = 'application/json';

    const file = await new Promise<File | null>((resolve, reject) => {
      inputElement.addEventListener('change', () => {
        if (!inputElement.files?.length) {
          reject(new Error('No files currently selected for upload'));
          return;
        }
        resolve(inputElement.files[FIRST_FILE_INDEX]);
      });

      inputElement.dispatchEvent(new MouseEvent('click'));
    });

    if (!file) {
      throw new Error('No file selected');
    }

    try {
      const text = await file.text();
      const data: unknown = JSON.parse(text);
      isListData(data);
      return data;
    } catch {
      throw new Error('Not a valid file type.');
    }
  }
}
