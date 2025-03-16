import { canvas } from '~/utils/create-element';
import { assertNotNull } from '~/utils/type-guards';

import type { OptionData } from '../options-list/options-list-model';

import { View } from '../view';
import { APP_COLORS, BASE_ANGLES } from './constants';
import { PickerUtility } from './picker-utility';

const VALUES = {
  HALF_SIZE: 2,
  OFFSET: 20,

  BASE_RATIO: 1,

  ZERO_COORDINATE: 0,

  SUFFICIENT_ANGLE: 0.2,

  OUTER_CIRCLE_STROKE: 10,
  INNER_CIRCLE_STROKE: 7,
  SEGMENTS_STROKE: 2,

  TITLE_FONT: '700 12px Montserrat',
  TITLE_STROKE_WIDTH: 2,
  TITLE_X_COORDINATE: 120,
  TITLE_Y_COORDINATE: 0,

  POINTER_WIDTH: 17,
  POINTER_HEIGHT: 25,
  POINTER_OVERLAP: 15,
  POINTER_STROKE_WIDTH: 6,

  EMPTY_TITLE_VALUE: '',
};

export type OptionDataWithColor = OptionData & { color: string };

export class Picker extends View<'canvas'> {
  protected view: HTMLCanvasElement;
  private readonly width: number;
  private readonly height: number;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly centerX: number;
  private readonly centerY: number;

  private readonly utility: PickerUtility;

  private readonly radius: number;
  private readonly radiansPerWeight: number;
  private startAngle: number;
  private readonly sectorsOptions: OptionDataWithColor[];
  private readonly onSectorChange: (title: string) => string;
  private readonly onAnimationEnd: () => void;
  private spinning: boolean;

  public constructor(
    sideLength: number,
    optionsData: OptionData[],
    onSectorChange: (title: string) => string,
    onAnimationEnd: () => void
  ) {
    super();

    this.utility = new PickerUtility();

    this.sectorsOptions = this.utility.createSectorOptions(optionsData);

    this.onSectorChange = onSectorChange;

    this.onAnimationEnd = onAnimationEnd;

    const devicePixelRatio = window.devicePixelRatio || VALUES.BASE_RATIO;

    this.width = sideLength * devicePixelRatio;
    this.height = sideLength * devicePixelRatio;

    this.view = this.createHTML();
    assertNotNull(this.view);

    this.view.style.width = `${String(sideLength)}px`;
    this.view.style.height = `${String(sideLength)}px`;

    const context = this.view.getContext('2d');
    assertNotNull(context);

    this.ctx = context;
    this.ctx.scale(devicePixelRatio, devicePixelRatio);

    this.centerX = sideLength / VALUES.HALF_SIZE;
    this.centerY = sideLength / VALUES.HALF_SIZE;
    this.radius = sideLength / VALUES.HALF_SIZE - VALUES.OFFSET;

    this.radiansPerWeight = this.utility.getRadiansPerWeight(
      this.sectorsOptions
    );

    this.startAngle = this.utility.toRadians(-BASE_ANGLES.DEGREES.QUARTER);

    this.spinning = false;

    this.drawPicker();
  }

  public spin(): void {
    if (this.spinning) {
      return;
    }

    this.spinning = true;

    let spinStartTime: number | null = null;

    const MILLISECONDS_PER_SECOND = 1000;

    const DURATION = 10_000;
    const FULL_TURNS_PER_SECOND = 1;

    const randomAngle = this.utility.getRandomEndAngle();

    const totalTurns =
      (DURATION / MILLISECONDS_PER_SECOND) * FULL_TURNS_PER_SECOND;
    const totalAngle = totalTurns * BASE_ANGLES.DEGREES.FULL_TURN + randomAngle;

    const animate = (timestamp: number): void => {
      if (spinStartTime === null) {
        spinStartTime = timestamp;
      }

      const elapsedTime = timestamp - spinStartTime;

      const FULL_PROGRESS = 1;
      let currentProgress = Math.min(elapsedTime / DURATION, FULL_PROGRESS);

      currentProgress = this.utility.easeInOutCirc(currentProgress);

      this.startAngle = this.utility.toRadians(
        currentProgress * totalAngle - BASE_ANGLES.DEGREES.QUARTER
      );

      this.drawPicker();
      this.onSectorChange(this.logCurrentSector());

      if (elapsedTime < DURATION) {
        requestAnimationFrame(animate);
      } else {
        this.spinning = false;
        this.onAnimationEnd();
      }
    };

    requestAnimationFrame(animate);
  }

  protected createHTML(): HTMLCanvasElement {
    const canvasElement = canvas({});

    canvasElement.width = this.width;
    canvasElement.height = this.height;

    return canvasElement;
  }

  private drawPicker(): void {
    this.drawPickerMount();

    this.drawSegments();

    this.drawCenterElement();

    this.drawPointer();
  }

  private drawSegments(): void {
    this.ctx.lineWidth = VALUES.SEGMENTS_STROKE;
    this.ctx.strokeStyle = APP_COLORS.WHITE;
    let startAngle = this.startAngle;

    for (const option of this.sectorsOptions) {
      const sectorAngle = option.weight * this.radiansPerWeight;
      const endAngle = startAngle + sectorAngle;

      this.ctx.beginPath();
      this.ctx.moveTo(this.centerX, this.centerY);
      this.ctx.arc(
        this.centerX,
        this.centerY,
        this.radius - VALUES.OUTER_CIRCLE_STROKE / VALUES.HALF_SIZE,
        startAngle,
        endAngle
      );
      this.ctx.closePath();
      this.ctx.fillStyle = option.color;
      this.ctx.fill();
      this.ctx.stroke();

      const middleAngle = startAngle + sectorAngle / VALUES.HALF_SIZE;

      if (sectorAngle > VALUES.SUFFICIENT_ANGLE) {
        this.drawOptionTitle(middleAngle, option.title);
      }

      startAngle = endAngle;
    }
  }

  private drawPickerMount(): void {
    this.ctx.clearRect(
      VALUES.ZERO_COORDINATE,
      VALUES.ZERO_COORDINATE,
      this.view.width,
      this.view.height
    );

    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      this.utility.toRadians(BASE_ANGLES.DEGREES.ZERO),
      this.utility.toRadians(BASE_ANGLES.DEGREES.FULL_TURN)
    );

    this.ctx.lineWidth = VALUES.OUTER_CIRCLE_STROKE;
    this.ctx.strokeStyle = APP_COLORS.PRIMARY;
    this.ctx.stroke();
  }

  private drawOptionTitle(middleAngle: number, title: string): void {
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(middleAngle);

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = VALUES.TITLE_FONT;
    this.ctx.fillStyle = APP_COLORS.PRIMARY;
    this.ctx.strokeStyle = APP_COLORS.WHITE;
    this.ctx.lineWidth = VALUES.TITLE_STROKE_WIDTH;

    const formattedTitle = this.utility.formatTitle(title);

    this.ctx.strokeText(
      formattedTitle,
      VALUES.TITLE_X_COORDINATE,
      VALUES.TITLE_Y_COORDINATE
    );
    this.ctx.fillText(
      formattedTitle,
      VALUES.TITLE_X_COORDINATE,
      VALUES.TITLE_Y_COORDINATE
    );

    this.ctx.restore();
  }

  private drawCenterElement(): void {
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      VALUES.OFFSET,
      this.utility.toRadians(BASE_ANGLES.DEGREES.ZERO),
      this.utility.toRadians(BASE_ANGLES.DEGREES.FULL_TURN)
    );

    this.ctx.fillStyle = APP_COLORS.WHITE;
    this.ctx.fill();

    this.ctx.lineWidth = VALUES.INNER_CIRCLE_STROKE;
    this.ctx.strokeStyle = APP_COLORS.PRIMARY;
    this.ctx.stroke();
  }

  private drawPointer(): void {
    const pointerX1 = this.centerX - VALUES.POINTER_WIDTH;
    const pointerX2 = this.centerX + VALUES.POINTER_WIDTH;
    const pointerY =
      this.centerY -
      this.radius -
      VALUES.POINTER_HEIGHT +
      VALUES.POINTER_OVERLAP;

    this.ctx.beginPath();
    this.ctx.moveTo(pointerX1, pointerY);
    this.ctx.lineTo(pointerX2, pointerY);
    this.ctx.lineTo(
      this.centerX,
      this.centerY - this.radius + VALUES.POINTER_OVERLAP
    );
    this.ctx.closePath();

    this.ctx.fillStyle = APP_COLORS.WHITE;
    this.ctx.fill();

    this.ctx.lineWidth = VALUES.POINTER_STROKE_WIDTH;
    this.ctx.strokeStyle = APP_COLORS.PRIMARY;
    this.ctx.stroke();
  }

  private logCurrentSector(): string {
    const pointerAngle = BASE_ANGLES.DEGREES.ZERO;

    let startAngle = this.startAngle + BASE_ANGLES.RADIANS.QUARTER;

    for (const option of this.sectorsOptions) {
      const currentSectorSize = option.weight * this.radiansPerWeight;
      const endAngle = startAngle + currentSectorSize;

      const normalizedSectorStart = startAngle % BASE_ANGLES.RADIANS.FULL_TURN;

      const normalizedSectorEnd = endAngle % BASE_ANGLES.RADIANS.FULL_TURN;

      if (
        normalizedSectorStart === pointerAngle ||
        normalizedSectorStart > normalizedSectorEnd
      ) {
        return option.title;
      }

      startAngle = endAngle;
    }

    return VALUES.EMPTY_TITLE_VALUE;
  }
}
