import type { ListData } from '~/components/options-list/options-list-model';

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isListData(data: unknown): asserts data is ListData {
  if (!isNonNullable(data)) {
    throw new Error('Data is null or undefined');
  }

  if (typeof data !== 'object' || !('list' in data) || !('lastId' in data)) {
    throw new Error('Invalid type');
  }
}
