import type { Page } from '~/view/app-page/app-page';

import { Router, ROUTES } from '~/router/router';

export default class App {
  private readonly router: Router;

  constructor() {
    this.router = new Router(ROUTES, this.setPage.bind(this));

    this.router.navigate(null);
  }

  private setPage(page: Page): void {
    document.body.replaceChildren();
    document.body.append(...page.getHtmlElements());
  }
}
