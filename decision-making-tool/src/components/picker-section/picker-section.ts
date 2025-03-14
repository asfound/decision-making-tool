import type { Router } from '~/router/router';

import { Button } from '~/components/button/button';
import { View } from '~/components/view';
import { BUTTON_TEXTS } from '~/constants/ui-texts';
import { RouterPage } from '~/router/pages';
import { section } from '~/utils/create-element';

import { Picker } from '../picker/picker';
import styles from './picker-section.module.css';

const CANVAS_SIZE = 500;
export default class PickerSection extends View<'section'> {
  protected view: HTMLElement;
  private readonly router: Router;

  constructor(router: Router) {
    super();

    this.view = this.createHTML();
    this.router = router;
  }

  public clearChildListener: () => void = () => {};

  public onRemove(): void {
    this.clearChildListener();
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

    this.clearChildListener = (): void => {
      backButton.removeListener();
    };

    const pickerElement = new Picker(CANVAS_SIZE);

    sectionElement.append(backButton.getHTML(), pickerElement.getHTML());
    return sectionElement;
  }
}
