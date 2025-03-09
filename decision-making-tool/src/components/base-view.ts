export abstract class BaseView {
  protected element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  public getHTML(): HTMLElement {
    return this.element;
  }
}
