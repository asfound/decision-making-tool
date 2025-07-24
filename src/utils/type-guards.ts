import type { ListData } from '~/types/interfaces';

import { ERRORS } from '~/constants/errors';

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function assertNotNull<T>(
  value: T | null | undefined
): asserts value is NonNullable<T> {
  if (!isNonNullable(value)) {
    throw new Error(ERRORS.NULLABLE_VALUE_ERROR);
  }
}

export function isListData(data: unknown): asserts data is ListData {
  assertNotNull(data);

  if (typeof data !== 'object' || !('list' in data) || !('lastId' in data)) {
    throw new Error(ERRORS.INVALID_TYPE_ERROR);
  }
}
