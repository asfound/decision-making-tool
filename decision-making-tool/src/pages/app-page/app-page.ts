import type { Tag } from '~/utils/create-element';

import type { View } from '../../components/view';
export interface Page {
  getHtmlElements(): HTMLElement[];
}
import { HeaderView } from '../../components/header/header-view';

export class AppPage implements Page {
  private readonly headerView: HeaderView;
  private readonly contentView: View<keyof HTMLElementTagNameMap>;

  constructor(view: View<Tag>) {
    this.headerView = new HeaderView();
    this.contentView = view;
  }
  public getHtmlElements(): HTMLElement[] {
    return [this.headerView.getHTML(), this.contentView.getHTML()];
  }
}
