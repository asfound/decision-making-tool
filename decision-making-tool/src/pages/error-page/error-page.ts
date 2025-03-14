import type { Router } from '~/router/router';

import { Button } from '~/components/button/button';
import { Heading } from '~/components/heading/heading';
import { BUTTON_TEXTS, HEADINGS } from '~/constants/ui-texts';
import { RouterPage } from '~/router/pages';
import { div, main } from '~/utils/create-element';

import type { Page } from '../app-page/app-page';

import { View } from '../../components/view';
import styles from './error-page.module.css';

export class ErrorPageView extends View<'main'> implements Page {
  protected view: HTMLElement;
  private readonly router: Router;

  constructor(router: Router) {
    super();

    this.view = this.createHTML();
    this.router = router;
  }

  public clearChildListener: () => void = () => {};

  public getHtmlElements(): HTMLElement[] {
    return [this.view];
  }

  public onRemove(): void {
    this.clearChildListener();
  }

  protected createHTML(): HTMLElement {
    const mainElement = main({});
    const headingElement = new Heading(HEADINGS.ERROR);

    const containerElement = div({ className: styles.container });

    const toMainButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.TO_MAIN,
      type: 'button',
      onClick: (): void => {
        this.router.navigate(RouterPage.INDEX);
      },
    });

    this.clearChildListener = (): void => {
      toMainButton.removeListener();
    };

    containerElement.append(headingElement.getHTML(), toMainButton.getHTML());

    mainElement.append(containerElement);
    return mainElement;
  }
}
