import type { ListData } from '~/types/types';

import { ERRORS } from '~/constants/errors';
import { INDEX_VALUES } from '~/constants/index-values';
import { a, input } from '~/utils/create-element';
import { isListData } from '~/utils/type-guards';

const FILENAME = 'as_found-options-list.json';

export class JsonFileService {
  public saveDataToFile(data: ListData): void {
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });

    const link = a({});

    link.href = URL.createObjectURL(blob);
    link.download = FILENAME;
    link.click();
  }

  public async loadDataFromFile(): Promise<ListData> {
    const inputElement = input({});
    inputElement.type = 'file';
    inputElement.accept = 'application/json';

    const file = await new Promise<File | null>((resolve, reject) => {
      inputElement.addEventListener('change', () => {
        if (!inputElement.files?.length) {
          reject(new Error(ERRORS.FILE_SELECT_ERROR));
          return;
        }
        resolve(inputElement.files[INDEX_VALUES.FIRST_INDEX]);
      });

      inputElement.dispatchEvent(new MouseEvent('click'));
    });

    if (!file) {
      throw new Error(ERRORS.FILE_SELECT_ERROR);
    }

    try {
      const text = await file.text();
      const data: unknown = JSON.parse(text);
      isListData(data);
      return data;
    } catch {
      throw new Error(ERRORS.INVALID_FILE_TYPE_ERROR);
    }
  }
}
