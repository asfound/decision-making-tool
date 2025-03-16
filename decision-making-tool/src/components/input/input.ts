import { input } from '~/utils/create-element';

import { View } from '../view';
import styles from './input.module.css';

type InputProperties = {
  placeholder: string;
  className?: string;
  attributes?: Record<string, string>;
};

export class Input extends View<'input'> {
  protected view: HTMLInputElement;
  private readonly properties: InputProperties;

  constructor(properties: InputProperties) {
    super();

    this.properties = properties;
    this.view = this.createHTML();
  }

  protected createHTML(): HTMLInputElement {
    const inputElement = input({ className: styles.input });

    inputElement.placeholder = this.properties.placeholder;

    if (this.properties.className) {
      inputElement.classList.add(this.properties.className);
    }

    if (this.properties.attributes) {
      for (const [key, value] of Object.entries(this.properties.attributes)) {
        inputElement.setAttribute(key, value);
      }
    }

    return inputElement;
  }
}
