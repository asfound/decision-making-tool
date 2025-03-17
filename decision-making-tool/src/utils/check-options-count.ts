import type { OptionData } from '~/components/options-list/options-list-model';

import { VALUES } from '~/components/options-list/constants/constants';

export function validateOptionsCount(optionsData: OptionData[]): boolean {
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
