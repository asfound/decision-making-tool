import type { Page } from '~/types/interfaces';
import type { Tag } from '~/utils/create-element';

import { Main } from '~/components/main/main';

import type { View } from '../../components/view';

import { Header } from '../../components/header/header';

export class AppPage implements Page {
  private readonly headerView: Header;

  private readonly mainView: Main;

  constructor(view: View<Tag>) {
    this.headerView = new Header();
    this.mainView = new Main(view);
  }

  public onRemove(): void {
    this.mainView.onRemove();
  }

  public getHtmlElements(): HTMLElement[] {
    return [this.headerView.getHTML(), this.mainView.getHTML()];
  }
}
