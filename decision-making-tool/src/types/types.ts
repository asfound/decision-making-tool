import type { OptionProperties } from '~/components/options-list/option-item/option-properties';

export type ButtonProperties = {
  textContent: string;
  type: HTMLButtonElement['type'];
  onClick: () => void;
  className?: string;
  actionButton?: boolean;
};

export type InputProperties = {
  placeholder: string;
  className?: string;
  attributes?: Record<string, string>;
};

export type ListData = {
  list: Array<OptionProperties>;
  lastId: number;
};

export type PastedOptionProperties = Omit<OptionProperties, 'id'>;

export type OptionPropertiesWithColor = OptionProperties & { color: string };
