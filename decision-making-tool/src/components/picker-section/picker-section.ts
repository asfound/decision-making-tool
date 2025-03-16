/* eslint-disable max-lines-per-function */
import type { Router } from '~/router/router';

import { Button } from '~/components/button/button';
import { View } from '~/components/view';
import { BUTTON_TEXTS, LABELS, PLACEHOLDERS } from '~/constants/ui-texts';
import { RouterPage } from '~/router/pages';
import { LocalStorageService } from '~/services/local-storage-service';
import { div, input, label, p, section } from '~/utils/create-element';

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

    const backButton = this.createBackButton();

    const inputContainer = div({});
    const labelElement = label({ textContent: LABELS.DURATION });
    labelElement.setAttribute('for', LABELS.DURATION);

    const MIN_DURATION = '5';

    const durationInput = input({});
    durationInput.setAttribute('id', LABELS.DURATION);
    durationInput.placeholder = PLACEHOLDERS.DURATION;
    durationInput.value = MIN_DURATION;
    durationInput.setAttribute('type', 'number');
    durationInput.setAttribute('min', MIN_DURATION);

    durationInput.addEventListener('change', () => {
      const value = Number(durationInput.value);

      if (value < Number(MIN_DURATION)) {
        durationInput.value = MIN_DURATION;
      }
    });

    inputContainer.append(labelElement, durationInput);

    const pickButton = new Button({
      textContent: BUTTON_TEXTS.PICK,
      type: 'button',
      onClick: (): void => {
        pickerElement.spin(Number(durationInput.value));
        sectorTitleDisplay.classList.remove(styles.selected);
      },
    });

    this.childListeners.push(() => {
      pickButton.removeListener();
    });

    const sectorTitleDisplay = p({ className: styles.display }, [
      PLACEHOLDERS.PICKER_DISPLAY,
    ]);

    const onSectorChange = (title: string): string =>
      (sectorTitleDisplay.textContent = title);

    const onAnimationEnd = (): void => {
      sectorTitleDisplay.classList.add(styles.selected);
    };

    const pickerElement = new Picker(
      CANVAS_SIZE,
      this.optionsData,
      onSectorChange,
      onAnimationEnd
    );

    sectionElement.append(
      backButton,
      inputContainer,
      pickButton.getHTML(),
      sectorTitleDisplay,
      pickerElement.getHTML()
    );
    return sectionElement;
  }

  private createBackButton(): HTMLButtonElement {
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

    return backButton.getHTML();
  }
}
