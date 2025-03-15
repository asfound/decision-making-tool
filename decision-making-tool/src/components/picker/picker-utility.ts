import { INDEX_VALUES } from '~/constants/index-values';

import type { OptionData } from '../options-list/options-list-model';

import { BASE_ANGLES, COLOR_RANGE } from './constants';

const INITIAL_VALUE = 0;

const RANDOM_THRESHOLD = 0.5;

export class PickerUtility {
  private readonly colorModel: string[] = ['red', 'green', 'blue'];

  public shuffleOptions(options: OptionData[]): OptionData[] {
    return options.sort(() => Math.random() - RANDOM_THRESHOLD);
  }

  public getRadiansPerWeight(sectorsOptions: OptionData[]): number {
    const totalWeight = sectorsOptions.reduce(
      (sum, option) => sum + option.weight,
      INITIAL_VALUE
    );

    return BASE_ANGLES.RADIANS.FULL / totalWeight;
  }

  public toRadians(degrees: number): number {
    return degrees * (Math.PI / BASE_ANGLES.DEGREES.HALF);
  }

  public getRandomColor(): string {
    const colorValues = this.colorModel.map(
      () =>
        Math.floor(
          Math.random() *
            (COLOR_RANGE.MAX_RANDOM - COLOR_RANGE.MIN + COLOR_RANGE.OFFSET)
        ) + COLOR_RANGE.MIN
    );

    const randomIndex = Math.floor(Math.random() * this.colorModel.length);

    colorValues[randomIndex] = COLOR_RANGE.MAX;

    return `rgb(${colorValues.join(', ')})`;
  }

  public formatTitle(text: string): string {
    const MAX_LENGTH = 20;

    if (text.length < MAX_LENGTH) {
      return text;
    } else {
      const slicedText = text.slice(INDEX_VALUES.FIRST_INDEX, MAX_LENGTH);

      return `${slicedText}...`;
    }
  }
}
