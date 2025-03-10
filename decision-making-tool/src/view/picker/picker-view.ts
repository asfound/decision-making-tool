import { section } from '~/utils/create-element';
import { View } from '~/view/view';

export default class PickerView extends View<'section'> {
  protected view: HTMLElement;

  constructor() {
    super();

    this.view = this.createHTML();
  }

  protected createHTML(): HTMLElement {
    const sectionElement = section({}, ['Wheel']);

    return sectionElement;
  }
}
