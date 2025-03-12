const EMPTY_QUANTITY = 0;
const EMPTY_STRING = '';

export class OptionProperties {
  constructor(
    public readonly id: number,
    public title = EMPTY_STRING,
    public weight = EMPTY_QUANTITY
  ) {}
}
