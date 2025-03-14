import { BASE_ANGLES, COLOR_RANGE } from './constants';

export class PickerUtility {
  private readonly colorModel: string[] = ['red', 'green', 'blue'];
  public toRadians(degrees: number): number {
    return degrees * (Math.PI / BASE_ANGLES.DEGREES_180);
  }

  public getRandomColor(): string {
    const colorValues = this.colorModel.map(
      () =>
        Math.floor(
          Math.random() *
            (COLOR_RANGE.MAX - COLOR_RANGE.MIN + COLOR_RANGE.OFFSET)
        ) + COLOR_RANGE.MIN
    );

    const randomIndex = Math.floor(Math.random() * this.colorModel.length);

    colorValues[randomIndex] = 0;

    return `rgb(${colorValues.join(', ')})`;
  }
}
