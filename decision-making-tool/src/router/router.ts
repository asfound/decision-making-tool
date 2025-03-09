import type Route from './route';

const locationField = 'pathname';

export class Router {
  private readonly routes: Route[];
  constructor(routes: Route[]) {
    this.routes = routes;
  }

  public navigate(): void {
    const urlString = globalThis.location[locationField].slice(1);

    const path = urlString.split('/');

    const pathToFind = path[0] ?? '';

    const routeToNavigate = this.routes.find((route) =>
      route.paths.includes(pathToFind)
    );

    // ToDO: add redirect to 404

    routeToNavigate?.callback().catch((error) => console.error(error));
  }
}
