import { OptionBar } from '~/components/options-list/option-bar/option-bar';
import { section } from '~/utils/create-element';
import { View } from '~/view/view';

export default class StartScreenView extends View<'section'> {
  protected view: HTMLElement;

  constructor() {
    super();

    this.view = this.createHTML();
  }

  protected createHTML(): HTMLElement {
    const sectionElement = section({}, ['StartScreen']);
    const optionElement = new OptionBar();

    sectionElement.append(optionElement.getHTML());
    return sectionElement;
  }
}
