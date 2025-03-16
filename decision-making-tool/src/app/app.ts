import type { Page } from '~/pages/app-page/app-page';

import { Router, ROUTES } from '~/router/router';

export class App {
  private readonly router: Router;
  private currentPage: Page | null = null;

  constructor() {
    // TODO use arrow functions instead of bind
    this.router = new Router(ROUTES, this.setPage.bind(this));

    this.router.navigate(null);
  }

  private setPage(page: Page): void {
    if (this.currentPage) {
      this.currentPage.onRemove();
    }

    document.body.replaceChildren();
    document.body.append(...page.getHtmlElements());

    this.currentPage = page;
  }
}
