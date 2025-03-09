import { isNonNullable } from './typeGuards';

type Tag = keyof HTMLElementTagNameMap;
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

export const main = createElementFactory('main');
