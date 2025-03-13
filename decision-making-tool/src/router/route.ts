import type { AppPage } from '~/view/app-page/app-page';

import type { Router } from './router';

export default class Route {
  constructor(
    public paths: string[],
    public getPage: (router: Router) => Promise<AppPage>
  ) {}
}
