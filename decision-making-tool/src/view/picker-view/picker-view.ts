import { BaseView } from '~/components/base-view';
import { section } from '~/utils/create-element';

export default class PickerView extends BaseView {
  constructor() {
    super(PickerView.createHTML());
  }

  private static createHTML(): HTMLElement {
    const sectionElement = section({}, ['Wheel']);

    return sectionElement;
  }
}
