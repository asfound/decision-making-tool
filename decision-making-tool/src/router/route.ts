import type { AppPage } from '~/view/app-page/app-page';

export default class Route {
  constructor(
    public paths: string[],
    public getPage: () => Promise<AppPage>
  ) {}
}
