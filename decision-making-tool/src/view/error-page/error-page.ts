import type { Router } from '~/router/router';

import { Button } from '~/components/button/button';
import { BUTTON_TEXTS } from '~/constants/ui-texts';
import { RouterPage } from '~/router/pages';
import { main } from '~/utils/create-element';

import type { Page } from '../app-page/app-page';

import { View } from '../view';

export class ErrorPageView extends View<'main'> implements Page {
  protected view: HTMLElement;
  private readonly router: Router;

  constructor(router: Router) {
    super();

    this.view = this.createHTML();
    this.router = router;
  }

  public getHtmlElements(): HTMLElement[] {
    return [this.view];
  }

  protected createHTML(): HTMLElement {
    const mainElement = main({}, ['Error page']);

    const toMainButton = new Button({
      textContent: BUTTON_TEXTS.TO_MAIN,
      type: 'button',
      onClick: (): void => {
        this.router.navigate(RouterPage.INDEX);
      },
    });

    mainElement.append(toMainButton.getHTML());
    return mainElement;
  }
}
