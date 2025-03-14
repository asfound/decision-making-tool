import type { Page } from '~/pages/app-page/app-page';

import { NotValidOptionsError } from '~/components/picker-section/picker-section';
import { ERRORS } from '~/constants/errors';
import { AppPage } from '~/pages/app-page/app-page';
import { ErrorPageView } from '~/pages/error-page/error-page';

import { RouterPage } from './pages';
import { Route } from './route';

const FRAGMENT_IDENTIFIER_INDEX = 1;

export class Router {
  private readonly routes: Route[];
  private readonly setPage: (page: Page) => void;
  constructor(routes: Route[], setPage: (page: Page) => void) {
    this.routes = routes;
    this.setPage = setPage;

    globalThis.addEventListener('hashchange', () => {
      this.navigate(null);
    });
  }

  public navigate(fragment: string | null): void {
    if (fragment) {
      this.setHistory(fragment);
    }

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
        .catch((error: unknown) => {
          if (error instanceof NotValidOptionsError) {
            this.navigate(RouterPage.INDEX);
          } else if (error instanceof Error) {
            throw new TypeError(`${ERRORS.PAGE_LOAD_ERROR} ${error}`);
          }
        });
    } else {
      this.setPage(new ErrorPageView(this));
    }
  }

  private setHistory(fragmentIdentifier: string): void {
    globalThis.location.href = `${globalThis.location.href.replace(/#(.*)$/, '')}#${fragmentIdentifier}`;
  }
}

export const ROUTES: Route[] = [
  new Route(['', RouterPage.INDEX], async (router: Router) => {
    const { default: StartSection } = await import(
      '~/components/start-section/start-section'
    );
    return new AppPage(new StartSection(router));
  }),
  new Route([RouterPage.PICKER], async (router: Router) => {
    const { default: PickerSection } = await import(
      '~/components/picker-section/picker-section'
    );
    return new AppPage(new PickerSection(router));
  }),
];
