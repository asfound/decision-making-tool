import { BaseView } from '~/components/base-view';
import { section } from '~/utils/create-element';

export default class StartScreenView extends BaseView {
  constructor() {
    super(StartScreenView.createHTML());
  }

  private static createHTML(): HTMLElement {
    const sectionElement = section({}, ['StartScreen']);

    return sectionElement;
  }
}
