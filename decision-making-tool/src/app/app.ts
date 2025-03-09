import { HeaderView } from '~/components/header/header-view';
import { MainView } from '~/components/main/main-view';
import { Page } from '~/router/pages';
import Route from '~/router/route';
import { Router } from '~/router/router';

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
        const { default: StartScreenView } = await import(
          '~/view/start-screen/start-screen-view'
        );
        this.main.setContent(new StartScreenView());
      }),
      new Route([`${Page.PICKER}`], async () => {
        const { default: WheelView } = await import(
          '~/view/picker-view/picker-view'
        );
        this.main.setContent(new WheelView());
      }),
    ];
  }

  private createView(): void {
    document.body.append(this.header.getHTML(), this.main.getHTML());
  }
}
