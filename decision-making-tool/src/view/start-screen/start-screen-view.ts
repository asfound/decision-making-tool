import { Button } from '~/components/button/button';
import { OptionsList } from '~/components/options-list/options-list';
import { OptionsListModel } from '~/components/options-list/options-list-model';
import { section } from '~/utils/create-element';
import { View } from '~/view/view';

export default class StartScreenView extends View<'section'> {
  protected view: HTMLElement;
  private readonly optionsListModel: OptionsListModel;
  private readonly optionsList: OptionsList;

  constructor() {
    super();

    this.optionsListModel = new OptionsListModel();
    this.optionsList = new OptionsList(this.optionsListModel);

    this.view = this.createHTML();
  }

  protected createHTML(): HTMLElement {
    const sectionElement = section({}, ['StartScreen']);

    const addOptionButton = new Button({
      textContent: 'add option',
      type: 'button',
      onClick: (): void => {
        this.optionsList.addOption();
      },
    });

    sectionElement.append(
      this.optionsList.getHTML(),
      addOptionButton.getHTML()
    );
    return sectionElement;
  }
}
