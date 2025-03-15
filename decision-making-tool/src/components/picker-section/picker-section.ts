import type { Router } from '~/router/router';

import { Button } from '~/components/button/button';
import { View } from '~/components/view';
import { BUTTON_TEXTS } from '~/constants/ui-texts';
import { RouterPage } from '~/router/pages';
import { LocalStorageService } from '~/services/local-storage-service';
import { section } from '~/utils/create-element';

import type { OptionData } from '../options-list/options-list-model';

import { Picker } from '../picker/picker';
import styles from './picker-section.module.css';

export class NotValidOptionsError extends Error {}

const CANVAS_SIZE = 500;
export default class PickerSection extends View<'section'> {
  protected view: HTMLElement;
  private readonly router: Router;
  private readonly localStorageService: LocalStorageService;
  private readonly optionsData: OptionData[];
  private readonly childListeners: (() => void)[] = [];

  constructor(router: Router) {
    super();

    this.router = router;
    this.localStorageService = new LocalStorageService();
    const listData = this.localStorageService.loadListData();

    // TODO add validation of options utility
    if (listData) {
      this.optionsData = listData.list;
      this.view = this.createHTML();
    } else {
      throw new NotValidOptionsError();
    }
  }

  public clearChildListener: () => void = () => {};

  public onRemove(): void {
    for (const callback of this.childListeners) {
      callback();
    }
  }

  protected createHTML(): HTMLElement {
    const sectionElement = section({ className: styles.section });

    const backButton = new Button({
      textContent: BUTTON_TEXTS.BACK,
      type: 'button',
      onClick: (): void => {
        this.router.navigate(RouterPage.INDEX);
      },
    });

    this.childListeners.push(() => {
      backButton.removeListener();
    });

    const pickButton = new Button({
      textContent: BUTTON_TEXTS.PICK,
      type: 'button',
      onClick: (): void => {
        this.router.navigate(RouterPage.INDEX);
      },
    });

    this.childListeners.push(() => {
      pickButton.removeListener();
    });

    const pickerElement = new Picker(CANVAS_SIZE, this.optionsData);

    sectionElement.append(
      backButton.getHTML(),
      pickButton.getHTML(),
      pickerElement.getHTML()
    );
    return sectionElement;
  }
}
