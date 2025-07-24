import type { PastedOptionProperties } from '~/types/types';

import { VALUES } from '~/components/options-list/constants/options-constants';
import { INDEX_VALUES } from '~/constants/index-values';

export class TextareaService {
  public parseTextInput(input: string): PastedOptionProperties[] {
    const strings = input.split('\n');
    const nonEmptyStrings = strings.filter((item) => item !== '');
    const CSVLikeStrings = nonEmptyStrings.filter((item) => item.includes(','));

    const values = CSVLikeStrings.map((item) => {
      const lastCommaIndex = item.lastIndexOf(',');
      const title = item.slice(INDEX_VALUES.FIRST_INDEX, lastCommaIndex).trim();
      const weightSlice = item
        .slice(lastCommaIndex + INDEX_VALUES.INDEX_INCREMENT)
        .trim();

      const weight =
        weightSlice === '' ? VALUES.EMPTY_QUANTITY : Number(weightSlice);

      return Number.isNaN(weight) ? null : { title, weight };
    });

    return values.filter((item) => item !== null);
  }
}
