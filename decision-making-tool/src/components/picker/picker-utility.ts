import { BASE_ANGLES, COLOR_RANGE } from './constants';

const TEMP = [
  { id: 18, title: 'One', weight: 10 },
  { id: 19, title: 'Two', weight: 67 },
  { id: 20, title: 'Three', weight: 4 },
];

const INITIAL_VALUE = 0;

export class PickerUtility {
  private readonly colorModel: string[] = ['red', 'green', 'blue'];

  public getRadiansPerWeight(): number {
    const totalWeight = TEMP.reduce(
      (sum, sector) => sum + sector.weight,
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
}
