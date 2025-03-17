import type { Router } from '~/router/router';

import onEndSound from '~/assets/audio/end-sound.mp3';
import { Button } from '~/components/button/button';
import { View } from '~/components/view';
import {
  BUTTON_ATTRIBUTES,
  INPUT_ATTRIBUTES,
  LABEL_ATTRIBUTES,
} from '~/constants/attributes';
import { BUTTON_TEXTS, LABELS, PLACEHOLDERS } from '~/constants/ui-texts';
import { RouterPage } from '~/router/pages';
import { LocalStorageService } from '~/services/local-storage-service';
import { validateOptionsCount } from '~/utils/check-options-count';
import { div, label, p, section } from '~/utils/create-element';

import type { OptionProperties } from '../options-list/option-item/option-properties';

import { Input } from '../input/input';
import {
  ANIMATION_VALUES,
  CANVAS_VALUES,
} from '../picker/constants/picker-constants';
import { Picker } from '../picker/picker';
import styles from './picker-section.module.css';

export class NotValidOptionsError extends Error {}

export default class PickerSection extends View<'section'> {
  protected view: HTMLElement;

  private readonly router: Router;

  private readonly localStorageService: LocalStorageService;

  private readonly optionsData: OptionProperties[];

  private readonly childListeners: (() => void)[] = [];

  private readonly interactionElements: (
    | HTMLInputElement
    | HTMLButtonElement
  )[] = [];

  private isMuted: boolean;

  constructor(router: Router) {
    super();

    this.router = router;

    this.localStorageService = new LocalStorageService();

    this.isMuted = this.localStorageService.loadSoundSetting();

    const listData = this.localStorageService.loadListData();

    if (listData && validateOptionsCount(listData.list)) {
      this.optionsData = listData.list;
      this.view = this.createHTML();
    } else {
      throw new NotValidOptionsError();
    }
  }

  public onRemove(): void {
    for (const callback of this.childListeners) {
      callback();
    }
  }

  protected createHTML(): HTMLElement {
    const sectionElement = section({ className: styles.section });

    const spinEndSound = new Audio(onEndSound);

    const buttonsContainer = div({ className: styles.container });

    const backButton = this.createBackButton();

    const inputElement = this.createInputElement();

    const titleDisplay = p({ className: styles.display }, [
      PLACEHOLDERS.PICKER_DISPLAY,
    ]);

    const onSectorChange = (title: string): string =>
      (titleDisplay.textContent = title);

    const onAnimationEnd = (): void => {
      this.toggleInteraction();
      titleDisplay.classList.add(styles.selected);

      if (!this.isMuted) {
        void spinEndSound.play();
      }
    };

    const soundButton = this.createSoundButton();

    const picker = new Picker(
      CANVAS_VALUES.CANVAS_SIZE,
      this.optionsData,
      onSectorChange,
      onAnimationEnd
    );

    const pickButton = this.createPickButton(
      picker,
      inputElement.input,
      titleDisplay
    );

    buttonsContainer.append(
      backButton,
      inputElement.container,
      soundButton,
      pickButton
    );

    sectionElement.append(buttonsContainer, titleDisplay, picker.getHTML());

    return sectionElement;
  }

  private createBackButton(): HTMLButtonElement {
    const backButton = new Button({
      textContent: BUTTON_TEXTS.BACK,
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,
      className: styles.button,

      onClick: (): void => {
        this.router.navigate(RouterPage.INDEX);
      },
    });

    this.childListeners.push(() => {
      backButton.removeListener();
    });

    this.interactionElements.push(backButton.getHTML());

    return backButton.getHTML();
  }

  private createInputElement(): {
    container: HTMLElement;
    input: HTMLInputElement;
  } {
    const inputContainer = div({ className: styles.duration });

    const labelElement = label({
      className: styles.label,
      textContent: LABELS.DURATION,
    });

    labelElement.setAttribute(LABEL_ATTRIBUTES.FOR, LABELS.DURATION);
    labelElement.setAttribute(LABEL_ATTRIBUTES.TITLE, LABELS.DURATION_TITLE);

    const durationInput = new Input({
      placeholder: PLACEHOLDERS.DURATION,
      className: styles.input,
      attributes: {
        id: LABELS.DURATION,
        type: INPUT_ATTRIBUTES.TYPE_NUMBER,
        min: ANIMATION_VALUES.MIN_DURATION,
      },
    }).getHTML();

    durationInput.value = ANIMATION_VALUES.MIN_DURATION;

    const handleDurationChange = (): void => {
      const value = Number(durationInput.value);

      if (value < Number(ANIMATION_VALUES.MIN_DURATION)) {
        durationInput.value = String(ANIMATION_VALUES.MIN_DURATION);
      }
    };

    durationInput.addEventListener('change', handleDurationChange);

    this.childListeners.push(() => {
      durationInput.removeEventListener('change', handleDurationChange);
    });

    inputContainer.append(labelElement, durationInput);

    this.interactionElements.push(durationInput);

    return { container: inputContainer, input: durationInput };
  }

  private createSoundButton(): HTMLButtonElement {
    const soundButton = new Button({
      textContent: this.getSoundButtonTextContent(),
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,
      className: styles.button,

      onClick: (): void => {
        this.isMuted = !this.isMuted;
        this.localStorageService.saveSoundSetting(this.isMuted);

        soundButton.getHTML().textContent = this.getSoundButtonTextContent();
      },
    });

    this.childListeners.push(() => {
      soundButton.removeListener();
    });

    this.interactionElements.push(soundButton.getHTML());

    return soundButton.getHTML();
  }

  private getSoundButtonTextContent(): string {
    return this.isMuted ? BUTTON_TEXTS.SOUND_ON : BUTTON_TEXTS.SOUND_OFF;
  }

  private createPickButton(
    picker: Picker,
    input: HTMLInputElement,
    display: HTMLElement
  ): HTMLButtonElement {
    const pickButton = new Button({
      textContent: BUTTON_TEXTS.PICK,
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,
      className: styles.button,
      actionButton: true,

      onClick: (): void => {
        picker.spin(Number(input.value));

        this.toggleInteraction();
        display.classList.remove(styles.selected);
      },
    });

    this.childListeners.push(() => {
      pickButton.removeListener();
    });

    this.interactionElements.push(pickButton.getHTML());

    return pickButton.getHTML();
  }

  private toggleInteraction(): void {
    for (const element of this.interactionElements) {
      element.disabled = !element.disabled;
    }
  }
}
