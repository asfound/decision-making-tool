import type { Page } from '~/view/app-page/app-page';

import { Router, ROUTES } from '~/router/router';
import { HeaderView } from '~/view/header/header-view';
import { MainView } from '~/view/main/main-view';

export default class App {
  private readonly header: HeaderView;
  private readonly main: MainView;
  private readonly router: Router;

  constructor() {
    this.header = new HeaderView();
    this.main = new MainView();

    this.router = new Router(ROUTES, this.setPage.bind(this));
    this.createView();
    this.router.navigate();
  }

  private createView(): void {
    document.body.append(this.header.getHTML(), this.main.getHTML());
  }

  private setPage(page: Page): void {
    document.body.replaceChildren();
    document.body.append(...page.getHtmlElements());
  }
}
