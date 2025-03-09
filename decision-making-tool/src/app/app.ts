import { HeaderView } from '~/components/header/header-view';

export default class App {
  private readonly header: HeaderView;

  constructor() {
    this.header = new HeaderView();
    this.createView();
  }

  private createView(): void {
    document.body.append(this.header.getHTML());
  }
}
