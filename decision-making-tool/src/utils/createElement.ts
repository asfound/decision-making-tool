import { isNonNullable } from './typeGuards';

type Properties<T extends keyof HTMLElementTagNameMap> = Partial<
  HTMLElementTagNameMap[T]
>;
type ChildNode = Node | null | undefined;

function createElement<T extends keyof HTMLElementTagNameMap>(
  tag: T,
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
}

function createElementFactory<T extends keyof HTMLElementTagNameMap>(tag: T) {
  return function createElementByTag(
    properties?: Properties<T>,
    children?: ChildNode[]
  ): HTMLElementTagNameMap[T] {
    return createElement(tag, properties, children);
  };
}

export const main = createElementFactory('main');
