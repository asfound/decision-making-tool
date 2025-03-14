import type { Tag } from '~/utils/create-element';

import { main } from '~/utils/create-element';

import { View } from '../view';

export class Main extends View<'main'> {
  protected view: HTMLElement;
  private readonly content: View<Tag>;

  public constructor(content: View<Tag>) {
    super();

    this.content = content;
    this.view = this.createHTML();
  }

  public onRemove(): void {
    this.content.onRemove();
  }

  protected createHTML(): HTMLElement {
    const mainElement = main({});
    mainElement.append(this.content.getHTML());

    return mainElement;
  }
}
