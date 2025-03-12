import { Button } from '~/components/button/button';
import { OptionsListController } from '~/components/options-list/options-list-controller';
import { OptionsListModel } from '~/components/options-list/options-list-model';
import { OptionsList } from '~/components/options-list/options-list-view/options-list-view';
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

    const addOptionButton = this.createAddOptionButton();

    const clearListButton = this.createClearListButton();

    const saveListButton = this.createSaveListButton();

    const loadListButton = this.createLoadListButton();

    sectionElement.append(
      this.optionsList.getHTML(),
      addOptionButton,
      clearListButton,
      saveListButton,
      loadListButton
    );
    return sectionElement;
  }

  private createAddOptionButton(): HTMLButtonElement {
    const addOptionButton = new Button({
      textContent: 'add option',
      type: 'button',
      onClick: (): void => {
        this.optionsList.addOption();
      },
    });

    return addOptionButton.getHTML();
  }

  private createClearListButton(): HTMLButtonElement {
    const clearListButton = new Button({
      textContent: 'clear list',
      type: 'button',
      onClick: (): void => {
        this.optionsList.clearList();
      },
    });

    return clearListButton.getHTML();
  }

  private createSaveListButton(): HTMLButtonElement {
    const saveListButton = new Button({
      textContent: 'save list to file',
      type: 'button',
      onClick: (): void => {
        this.optionsList.saveListToFile();
      },
    });

    return saveListButton.getHTML();
  }

  private createLoadListButton(): HTMLButtonElement {
    const loadListButton = new Button({
      textContent: 'load list from file',
      type: 'button',
      onClick: (): void => {
        this.optionsList.loadListFromFile();
      },
    });

    return loadListButton.getHTML();
  }
}
