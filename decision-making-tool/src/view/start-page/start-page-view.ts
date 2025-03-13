import { Button } from '~/components/button/button';
import { Modal } from '~/components/modal/modal';
import { OptionsListController } from '~/components/options-list/options-list-controller';
import { OptionsListModel } from '~/components/options-list/options-list-model';
import { OptionsList } from '~/components/options-list/options-list-view/options-list-view';
import { Textarea } from '~/components/textarea/textarea';
import { BUTTON_TEXTS } from '~/constants/ui-texts';
import { div, section } from '~/utils/create-element';
import { View } from '~/view/view';

import styles from './start-page.module.css';

export default class StartPageView extends View<'section'> {
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
    const sectionElement = section({ className: styles.section });

    const buttonsContainer = div({ className: styles.container });

    const addOptionButton = this.createAddOptionButton();

    const clearListButton = this.createClearListButton();

    const saveListButton = this.createSaveListButton();

    const loadListButton = this.createLoadListButton();

    const pasteListButton = this.createPasteListButton();

    const startButton = this.createStartButton();

    buttonsContainer.append(
      addOptionButton,
      clearListButton,
      pasteListButton,
      saveListButton,
      loadListButton,
      startButton
    );

    sectionElement.append(this.optionsList.getHTML(), buttonsContainer);
    return sectionElement;
  }

  private createAddOptionButton(): HTMLButtonElement {
    const addOptionButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.ADD_OPTION,
      type: 'button',
      onClick: (): void => {
        this.optionsList.addOption();
      },
    });

    return addOptionButton.getHTML();
  }

  private createClearListButton(): HTMLButtonElement {
    const clearListButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.CLEAR_LIST,
      type: 'button',
      onClick: (): void => {
        this.optionsList.clearList();
      },
    });

    return clearListButton.getHTML();
  }

  private createSaveListButton(): HTMLButtonElement {
    const saveListButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.SAVE_LIST,
      type: 'button',
      onClick: (): void => {
        this.optionsList.saveListToFile();
      },
    });

    return saveListButton.getHTML();
  }

  private createLoadListButton(): HTMLButtonElement {
    const loadListButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.LOAD_LIST,
      type: 'button',
      onClick: (): void => {
        this.optionsList.loadListFromFile();
      },
    });

    return loadListButton.getHTML();
  }

  private createPasteListButton(): HTMLButtonElement {
    const pasteListButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.PASTE_LIST,
      type: 'button',
      onClick: (): void => {
        const textareaElement = new Textarea();

        const modal = new Modal(textareaElement.getHTML(), () => {
          this.optionsList.pasteList(textareaElement.getValue());
        });
        document.body.prepend(modal.getHTML());
        modal.showModal();
      },
    });

    return pasteListButton.getHTML();
  }

  private createStartButton(): HTMLButtonElement {
    const startButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.START,
      type: 'button',
      onClick: (): void => {
        console.log(startButton);
      },
    });

    return startButton.getHTML();
  }
}
