export interface Page {
  getHtmlElements(): HTMLElement[];
  onRemove(): void;
}
