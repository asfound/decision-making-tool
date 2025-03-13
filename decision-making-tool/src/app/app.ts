import { Page } from '~/router/pages';
import Route from '~/router/route';
import { Router } from '~/router/router';
import { HeaderView } from '~/view/header/header-view';
import { MainView } from '~/view/main/main-view';

export default class App {
  private readonly header: HeaderView;
  private readonly main: MainView;
  private readonly router: Router;

  constructor() {
    this.header = new HeaderView();
    this.main = new MainView();

    const routes = this.createRoutes();
    this.router = new Router(routes);
    this.createView();
    this.router.navigate();
  }

  private createRoutes(): Route[] {
    return [
      new Route(['', `${Page.INDEX}`], async () => {
        const { default: StartPageView } = await import(
          '~/view/start-page/start-page-view'
        );
        this.main.setContent(new StartPageView());
      }),
      new Route([`${Page.PICKER}`], async () => {
        const { default: WheelView } = await import(
          '~/view/picker-page/picker-page-view'
        );
        this.main.setContent(new WheelView());
      }),
    ];
  }

  private createView(): void {
    document.body.append(this.header.getHTML(), this.main.getHTML());
  }
}
