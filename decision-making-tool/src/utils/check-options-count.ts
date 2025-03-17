import type { OptionProperties } from '~/components/options-list/option-item/option-properties';

import { VALUES } from '~/components/options-list/constants/options-constants';

export function validateOptionsCount(optionsData: OptionProperties[]): boolean {
  if (optionsData.length < VALUES.MINIMUM_OF_VALID_OPTIONS) {
    return false;
  }

  const validOptions = optionsData.filter(
    (option) => option.weight > VALUES.EMPTY_QUANTITY && option.title
  );

  if (validOptions.length < VALUES.MINIMUM_OF_VALID_OPTIONS) {
    return false;
  }

  return true;
}
