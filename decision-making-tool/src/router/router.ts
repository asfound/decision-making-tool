import type { Page } from '~/view/app-page/app-page';

import { AppPage } from '~/view/app-page/app-page';
import { ErrorPageView } from '~/view/error-page/error-page';

import { RouterPage } from './pages';
import Route from './route';

const FRAGMENT_IDENTIFIER_INDEX = 1;

export class Router {
  private readonly routes: Route[];
  private readonly setPage: (page: Page) => void;
  constructor(routes: Route[], setPage: (page: Page) => void) {
    this.routes = routes;
    this.setPage = setPage;

    globalThis.addEventListener('hashchange', () => this.navigate(null));
  }

  public navigate(fragment: string | null): void {
    if (fragment) {
      this.setHistory(fragment);
    }
    console.log(globalThis.location.hash);
    const fragmentIdentifier = globalThis.location.hash.slice(
      FRAGMENT_IDENTIFIER_INDEX
    );

    const routeToNavigate = this.routes.find((route) =>
      route.paths.includes(fragmentIdentifier)
    );

    if (routeToNavigate) {
      routeToNavigate
        .getPage(this)
        .then((page) => {
          this.setPage(page);
        })
        .catch((error) => {
          throw new Error('Could not load page, invalid import: ' + error);
        });
    } else {
      this.setPage(new ErrorPageView());
    }
  }

  private setHistory(fragmentIdentifier: string): void {
    globalThis.location.href = `${globalThis.location.href.replace(/#(.*)$/, '')}#${fragmentIdentifier}`;
  }
}

export const ROUTES: Route[] = [
  new Route(['', `${RouterPage.INDEX}`], async (router: Router) => {
    const { default: StartPageView } = await import(
      '~/view/start-page/start-page-view'
    );
    return new AppPage(new StartPageView(router));
  }),
  new Route([`${RouterPage.PICKER}`], async (router: Router) => {
    const { default: PickerPageView } = await import(
      '~/view/picker-page/picker-page-view'
    );
    return new AppPage(new PickerPageView(router));
  }),
];
