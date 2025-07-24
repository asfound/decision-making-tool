import type { OptionPropertiesWithColor } from '~/types/types';

import { INDEX_VALUES } from '~/constants/index-values';

import { OptionProperties } from '../options-list/option-item/option-properties';
import {
  BASE_ANGLES,
  COLOR_RANGE,
  EASING_VALUES,
  UTILITY_VALUES,
} from './constants/picker-constants';

export class PickerUtility {
  private readonly colorModel: string[] = ['red', 'green', 'blue'];

  public createSectorOptions(
    options: OptionProperties[]
  ): OptionPropertiesWithColor[] {
    const shuffleOptions = this.shuffleOptions(options);

    return shuffleOptions.map((option) =>
      Object.assign(
        new OptionProperties(option.id, option.title, option.weight),
        {
          color: this.getRandomColor(),
        }
      )
    );
  }

  public shuffleOptions(options: OptionProperties[]): OptionProperties[] {
    return options.sort(() => Math.random() - UTILITY_VALUES.RANDOM_THRESHOLD);
  }

  public getRadiansPerWeight(sectorsOptions: OptionProperties[]): number {
    const totalWeight = sectorsOptions.reduce(
      (sum, option) => sum + option.weight,
      UTILITY_VALUES.INITIAL_VALUE
    );

    return BASE_ANGLES.RADIANS.FULL_TURN / totalWeight;
  }

  public toRadians(degrees: number): number {
    return degrees * (Math.PI / BASE_ANGLES.DEGREES.HALF_TURN);
  }

  public toDegrees(radians: number): number {
    return radians * (BASE_ANGLES.DEGREES.HALF_TURN / Math.PI);
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

  public getRandomEndAngle(): number {
    return Math.random() * BASE_ANGLES.DEGREES.FULL_TURN;
  }

  public easeInOutCirc(x: number): number {
    return x < EASING_VALUES.MID_POINT
      ? EASING_VALUES.SCALE_FACTOR * x * x
      : EASING_VALUES.MAX_VALUE -
          Math.pow(
            -EASING_VALUES.SCALE_FACTOR * x + EASING_VALUES.CURVE_SHAPE,
            EASING_VALUES.POWER_OF_2
          ) /
            EASING_VALUES.HALF;
  }
}
