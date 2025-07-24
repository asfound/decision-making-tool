import type { OptionProperties } from '~/components/options-list/option-item/option-properties';

export type PastedOptionProperties = Omit<OptionProperties, 'id'>;

export type OptionPropertiesWithColor = OptionProperties & { color: string };
