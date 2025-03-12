import { isNonNullable } from './type-guards';

export type Tag = keyof HTMLElementTagNameMap;
type Properties<T extends Tag> = Partial<HTMLElementTagNameMap[T]>;
type ChildNode = Node | string | null | undefined;

function createElementFactory<T extends Tag>(tag: T) {
  return function createElement(
    properties?: Properties<T>,
    children?: ChildNode[]
  ): HTMLElementTagNameMap[T] {
    const element = document.createElement(tag);

    if (properties) {
      Object.assign(element, properties);
    }

    if (children) {
      element.append(...children.filter((child) => isNonNullable(child)));
    }

    return element;
  };
}

export const a = createElementFactory('a');

export const button = createElementFactory('button');

export const div = createElementFactory('div');

export const h1 = createElementFactory('h1');

export const input = createElementFactory('input');

export const header = createElementFactory('header');

export const label = createElementFactory('label');

export const li = createElementFactory('li');

export const main = createElementFactory('main');

export const section = createElementFactory('section');

export const ul = createElementFactory('ul');
