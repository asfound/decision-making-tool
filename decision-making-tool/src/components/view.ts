import type { Tag } from '~/utils/create-element';

export abstract class View<T extends Tag> {
  protected abstract view: HTMLElementTagNameMap[T];

  public getHTML(): HTMLElementTagNameMap[T] {
    return this.view;
  }

  public removeElement(): void {
    this.view.remove();
  }

  public onRemove(): void {}

  protected abstract createHTML(): HTMLElementTagNameMap[T];
}
