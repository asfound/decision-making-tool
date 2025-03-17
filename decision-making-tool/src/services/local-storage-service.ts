import type { ListData } from '~/types/types';

import { LOCAL_STORAGE } from '~/constants/local-storage';
import { isListData } from '~/utils/type-guards';

export class LocalStorageService {
  private readonly lsPrefix: string;
  private readonly listKey: string;
  private readonly soundKey: string;

  constructor() {
    this.lsPrefix = LOCAL_STORAGE.LS_PREFIX;
    this.listKey = LOCAL_STORAGE.LIST_KEY;
    this.soundKey = LOCAL_STORAGE.SOUND_KEY;
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

  public saveSoundSetting(data: boolean): void {
    this.saveToStorage(this.soundKey, JSON.stringify(data));
  }

  public loadSoundSetting(): boolean {
    const data = this.loadFromStorage(this.soundKey);

    if (data) {
      const parsedData: unknown = JSON.parse(data);

      if (typeof parsedData === 'boolean') {
        return parsedData;
      }
    }

    return false;
  }

  private saveToStorage(key: string, value: string): void {
    localStorage.setItem(`${this.lsPrefix}${key}`, value);
  }

  private loadFromStorage(key: string): string | null {
    return localStorage.getItem(`${this.lsPrefix}${key}`);
  }
}
