import { Button } from '~/components/button/button';
import { OptionsListController } from '~/components/options-list/options-list-controller';
import { OptionsListModel } from '~/components/options-list/options-list-model';
import { OptionsList } from '~/components/options-list/options-list-view';
import { section } from '~/utils/create-element';
import { View } from '~/view/view';

export default class StartScreenView extends View<'section'> {
  protected view: HTMLElement;
  private readonly optionsListModel: OptionsListModel;
  private readonly optionsList: OptionsList;
  private readonly optionsListController: OptionsListController;

  constructor() {
    super();

    this.optionsListModel = new OptionsListModel();
    this.optionsListController = new OptionsListController(
      this.optionsListModel
    );
    this.optionsList = new OptionsList(this.optionsListController);

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
