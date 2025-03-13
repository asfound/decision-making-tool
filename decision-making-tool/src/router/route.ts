import type { AppPage } from '~/pages/app-page/app-page';

import type { Router } from './router';

export class Route {
  constructor(
    public paths: string[],
    public getPage: (router: Router) => Promise<AppPage>
  ) {}
}
