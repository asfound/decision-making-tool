import { INDEX_VALUES } from '~/constants/index-values';

import type { OptionData } from '../options-list/options-list-model';

import { BASE_ANGLES, COLOR_RANGE } from './constants';

const INITIAL_VALUE = 0;

const RANDOM_THRESHOLD = 0.5;

import type { OptionDataWithColor } from './picker';
export class PickerUtility {
  private readonly colorModel: string[] = ['red', 'green', 'blue'];

  public createSectorOptions(options: OptionData[]): OptionDataWithColor[] {
    const shuffleOptions = this.shuffleOptions(options);

    return shuffleOptions.map((option) => ({
      ...option,
      color: this.getRandomColor(),
    }));
  }

  public shuffleOptions(options: OptionData[]): OptionData[] {
    return options.sort(() => Math.random() - RANDOM_THRESHOLD);
  }

  public getRadiansPerWeight(sectorsOptions: OptionData[]): number {
    const totalWeight = sectorsOptions.reduce(
      (sum, option) => sum + option.weight,
      INITIAL_VALUE
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
    return Math.random() * BASE_ANGLES.RADIANS.FULL_TURN;
  }

  public easeInOutCirc(x: number): number {
    return x < EASING.MID_POINT
      ? EASING.SCALE_FACTOR * x * x
      : EASING.MAX_VALUE -
          Math.pow(
            -EASING.SCALE_FACTOR * x + EASING.CURVE_SHAPE,
            EASING.POWER_OF_2
          ) /
            EASING.HALF;
  }
}

const EASING = {
  MID_POINT: 0.5,
  MAX_VALUE: 1,
  SCALE_FACTOR: 2,
  CURVE_SHAPE: 2,
  HALF: 2,
  POWER_OF_2: 2,
};
