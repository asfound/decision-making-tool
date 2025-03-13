import type { Router } from '~/router/router';

import { Button } from '~/components/button/button';
import { SHARED_CLASSES } from '~/constants/shared-classes';
import { BUTTON_TEXTS } from '~/constants/ui-texts';
import { RouterPage } from '~/router/pages';
import { div, h1, main } from '~/utils/create-element';

import type { Page } from '../app-page/app-page';

import { View } from '../../components/view';
import styles from './error-page.module.css';

const HEADING_TEXT = 'Something went wrong or page does not exist';
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

  public onRemove(): void {
    //remove listener
  }

  protected createHTML(): HTMLElement {
    const mainElement = main({});
    const headingElement = h1({ className: styles.heading }, [HEADING_TEXT]);
    headingElement.classList.add(SHARED_CLASSES.HEADING);

    const containerElement = div({ className: styles.container });

    const toMainButton = new Button({
      className: styles.button,
      textContent: BUTTON_TEXTS.TO_MAIN,
      type: 'button',
      onClick: (): void => {
        this.router.navigate(RouterPage.INDEX);
      },
    });

    containerElement.append(headingElement, toMainButton.getHTML());

    mainElement.append(containerElement);
    return mainElement;
  }
}
