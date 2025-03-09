import { BaseView } from '~/components/base-view';
import { section } from '~/utils/create-element';

export class WheelView extends BaseView {
  constructor() {
    super(WheelView.createHTML());
  }

  private static createHTML(): HTMLElement {
    const sectionElement = section({}, ['Wheel']);

    return sectionElement;
  }
}
