import type { OptionProperties } from '~/components/options-list/option-item/option-properties';

export interface Page {
  getHtmlElements(): HTMLElement[];
  onRemove(): void;
}

export interface ButtonProperties {
  textContent: string;
  type: HTMLButtonElement['type'];
  onClick: () => void;
  className?: string;
  actionButton?: boolean;
}

export interface InputProperties {
  placeholder: string;
  className?: string;
  attributes?: Record<string, string>;
}

export interface ListData {
  list: OptionProperties[];
  lastId: number;
}
