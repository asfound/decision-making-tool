import { VALUES } from '../constants/options-constants';
export class OptionProperties {
  constructor(
    public readonly id: number,
    public title = VALUES.EMPTY_STRING,
    public weight = VALUES.EMPTY_QUANTITY
  ) {}
}
