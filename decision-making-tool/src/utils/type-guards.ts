import type { ListData } from '~/types/types';

import { ERRORS } from '~/constants/errors';
export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isListData(data: unknown): asserts data is ListData {
  if (!isNonNullable(data)) {
    throw new Error(ERRORS.NULLABLE_VALUE_ERROR);
  }

  if (typeof data !== 'object' || !('list' in data) || !('lastId' in data)) {
    throw new Error(ERRORS.INVALID_TYPE_ERROR);
  }
}

export function assertNotNull<T>(
  value: T | null | undefined
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(ERRORS.NULLABLE_VALUE_ERROR);
  }
}
