import type { Tag } from '~/utils/create-element';

import { MainView } from '~/components/main/main-view';

import type { View } from '../../components/view';

import { HeaderView } from '../../components/header/header';

export interface Page {
  getHtmlElements(): HTMLElement[];
  onRemove(): void;
}

export class AppPage implements Page {
  private readonly headerView: HeaderView;
  private readonly mainView: MainView;

  constructor(view: View<Tag>) {
    this.headerView = new HeaderView();
    this.mainView = new MainView(view);
  }

  public onRemove(): void {
    this.mainView.onRemove();
  }

  public getHtmlElements(): HTMLElement[] {
    return [this.headerView.getHTML(), this.mainView.getHTML()];
  }
}
