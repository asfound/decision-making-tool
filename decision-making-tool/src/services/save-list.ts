import type { ListData } from '~/components/options-list/options-list-model';

import { a } from '~/utils/create-element';
export class SaveListService {
  public saveDataToFile(data: ListData): void {
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });

    const link = a({});

    link.href = URL.createObjectURL(blob);
    link.download = 'options-list-asfound.json';
    link.click();
  }
}
