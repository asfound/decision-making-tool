import type { Router } from '~/router/router';

import { Button } from '~/components/button/button';
import { BUTTON_TEXTS } from '~/constants/ui-texts';
import { RouterPage } from '~/router/pages';
import { section } from '~/utils/create-element';
import { View } from '~/view/view';

export default class PickerPageView extends View<'section'> {
  protected view: HTMLElement;
  private readonly router: Router;

  constructor(router: Router) {
    super();

    this.view = this.createHTML();
    this.router = router;
  }

  protected createHTML(): HTMLElement {
    const sectionElement = section({}, ['Wheel']);

    const backButton = new Button({
      textContent: BUTTON_TEXTS.BACK,
      type: 'button',
      onClick: (): void => {
        this.router.navigate(RouterPage.INDEX);
      },
    });

    sectionElement.append(backButton.getHTML());
    return sectionElement;
  }
}
