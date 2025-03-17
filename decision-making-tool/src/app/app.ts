import type { Page } from '~/types/interfaces';

import { Router, ROUTES } from '~/router/router';

export class App {
  private readonly router: Router;

  private currentPage: Page | null = null;

  constructor() {
    this.router = new Router(ROUTES, (page: Page) => {
      this.setPage(page);
    });

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
