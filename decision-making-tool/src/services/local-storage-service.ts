import type { ListData } from '~/components/options-list/options-list-model';

import { isListData } from '~/utils/type-guards';

const LS_PREFIX = 'asfound-';
const LIST_KEY = 'list-state';

export class LocalStorageService {
  private readonly lsPrefix: string;
  private readonly listKey: string;

  constructor() {
    this.lsPrefix = LS_PREFIX;
    this.listKey = LIST_KEY;
  }

  public saveListData(data: ListData): void {
    this.saveToStorage(this.listKey, JSON.stringify(data));
  }

  public loadListData(): ListData | null {
    const data = this.loadFromStorage(this.listKey);

    if (data) {
      const parsedData: unknown = JSON.parse(data);
      isListData(parsedData);

      return parsedData;
    } else {
      return null;
    }
  }

  private saveToStorage(key: string, value: string): void {
    localStorage.setItem(`${this.lsPrefix}${key}`, value);
  }

  private loadFromStorage(key: string): string | null {
    return localStorage.getItem(`${this.lsPrefix}${key}`);
  }
}
