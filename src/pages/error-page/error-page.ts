import type { Router } from '~/router/router';
import type { Page } from '~/types/interfaces';

import { Button } from '~/components/button/button';
import { Heading } from '~/components/heading/heading';
import { BUTTON_ATTRIBUTES } from '~/constants/attributes';
import { BUTTON_TEXTS, HEADINGS } from '~/constants/ui-texts';
import { RouterPage } from '~/router/pages';
import { div, main } from '~/utils/create-element';

import { View } from '../../components/view';
import styles from './error-page.module.css';

export class ErrorPageView extends View<'main'> implements Page {
  protected view: HTMLElement;

  private readonly router: Router;

  private readonly childListeners: (() => void)[] = [];

  constructor(router: Router) {
    super();

    this.view = this.createHTML();
    this.router = router;
  }

  public onRemove(): void {
    for (const callback of this.childListeners) {
      callback();
    }
  }

  public getHtmlElements(): HTMLElement[] {
    return [this.view];
  }

  protected createHTML(): HTMLElement {
    const mainElement = main({});
    const headingElement = new Heading(HEADINGS.ERROR);

    const containerElement = div({ className: styles.container });

    const toMainButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.TO_MAIN,
      type: BUTTON_ATTRIBUTES.TYPE_BUTTON,

      onClick: (): void => {
        this.router.navigate(RouterPage.INDEX);
      },
    });

    this.childListeners.push(() => {
      toMainButton.removeListener();
    });

    containerElement.append(headingElement.getHTML(), toMainButton.getHTML());

    mainElement.append(containerElement);
    return mainElement;
  }
}
