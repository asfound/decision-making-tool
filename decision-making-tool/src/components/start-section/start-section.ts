import type { Router } from '~/router/router';

import { Button } from '~/components/button/button';
import { Modal } from '~/components/modal/modal';
import { OptionsListController } from '~/components/options-list/options-list-controller';
import { OptionsListModel } from '~/components/options-list/options-list-model';
import { OptionsList } from '~/components/options-list/options-list-view/options-list-view';
import { Textarea } from '~/components/textarea/textarea';
import { View } from '~/components/view';
import { BUTTON_ATTRIBUTES } from '~/constants/attributes';
import { BUTTON_TEXTS, MODAL } from '~/constants/ui-texts';
import { TEXTAREA_SIZE } from '~/constants/ui-values';
import { RouterPage } from '~/router/pages';
import { div, p, section } from '~/utils/create-element';

import styles from './start-section.module.css';

export default class StartSection extends View<'section'> {
  protected view: HTMLElement;

  private readonly optionsListModel: OptionsListModel;

  private readonly optionsList: OptionsList;

  private readonly optionsListController: OptionsListController;

  private readonly router: Router;

  private readonly childListeners: (() => void)[] = [];

  constructor(router: Router) {
    super();
    this.router = router;

    this.optionsListModel = new OptionsListModel();
    this.optionsListController = new OptionsListController(
      this.optionsListModel
    );
    this.optionsList = new OptionsList(this.optionsListController);

    this.view = this.createHTML();
  }

  public onRemove(): void {
    this.optionsList.clearView();

    for (const callback of this.childListeners) {
      callback();
    }
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
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,

      onClick: (): void => {
        this.optionsList.addOption();
      },
    });

    this.childListeners.push(() => {
      addOptionButton.removeListener();
    });

    return addOptionButton.getHTML();
  }

  private createClearListButton(): HTMLButtonElement {
    const clearListButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.CLEAR_LIST,
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,

      onClick: (): void => {
        this.optionsList.clearList();
      },
    });

    this.childListeners.push(() => {
      clearListButton.removeListener();
    });

    return clearListButton.getHTML();
  }

  private createSaveListButton(): HTMLButtonElement {
    const saveListButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.SAVE_LIST,
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,

      onClick: (): void => {
        this.optionsList.saveListToFile();
      },
    });

    this.childListeners.push(() => {
      saveListButton.removeListener();
    });

    return saveListButton.getHTML();
  }

  private createLoadListButton(): HTMLButtonElement {
    const loadListButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.LOAD_LIST,
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,

      onClick: (): void => {
        this.optionsList.loadListFromFile();
      },
    });

    this.childListeners.push(() => {
      loadListButton.removeListener();
    });

    return loadListButton.getHTML();
  }

  private createPasteListButton(): HTMLButtonElement {
    const pasteListButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.PASTE_LIST,
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,

      onClick: (): void => {
        const textareaElement = new Textarea(
          TEXTAREA_SIZE.COLUMNS,
          TEXTAREA_SIZE.ROWS
        );

        this.openModal(textareaElement.getHTML(), () => {
          this.optionsList.pasteList(textareaElement.getValue());
        });
      },
    });

    this.childListeners.push(() => {
      pasteListButton.removeListener();
    });

    return pasteListButton.getHTML();
  }

  private createStartButton(): HTMLButtonElement {
    const startButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.START,
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,
      actionButton: true,

      onClick: (): void => {
        if (this.optionsListController.validateOptionsCount()) {
          this.router.navigate(RouterPage.PICKER);
        } else {
          const message = p({}, [MODAL.INVALID_OPTIONS_COUNT]);

          this.openModal(message);
        }
      },
    });

    this.childListeners.push(() => {
      startButton.removeListener();
    });

    return startButton.getHTML();
  }

  private openModal(content: HTMLElement, callback?: () => void): void {
    const modal = new Modal(content, callback);
    document.body.prepend(modal.getHTML());

    modal.showModal();
  }
}
