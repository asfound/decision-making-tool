import { OptionsList } from '~/components/options-list/options-list';
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
    const optionsList = new OptionsList([{}]);

    sectionElement.append(optionsList.getHTML());
    return sectionElement;
  }
}
