import type { OptionPropertiesWithColor } from '~/types/types';

import { canvas } from '~/utils/create-element';
import { assertNotNull } from '~/utils/type-guards';

import type { OptionProperties } from '../options-list/option-item/option-properties';

import { View } from '../view';
import {
  ANIMATION_VALUES,
  APP_COLORS,
  BASE_ANGLES,
  CANVAS_VALUES,
} from './constants/picker-constants';
import { PickerUtility } from './picker-utility';

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

  private readonly sectorsOptions: OptionPropertiesWithColor[];

  private readonly onSectorChange: (title: string) => string;

  private readonly onAnimationEnd: () => void;

  private spinning: boolean;

  public constructor(
    sideLength: number,
    optionsData: OptionProperties[],
    onSectorChange: (title: string) => string,
    onAnimationEnd: () => void
  ) {
    super();

    this.utility = new PickerUtility();

    this.sectorsOptions = this.utility.createSectorOptions(optionsData);

    this.onSectorChange = onSectorChange;

    this.onAnimationEnd = onAnimationEnd;

    const devicePixelRatio =
      window.devicePixelRatio || CANVAS_VALUES.BASE_RATIO;

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

    this.centerX = sideLength / CANVAS_VALUES.HALF_SIZE;
    this.centerY = sideLength / CANVAS_VALUES.HALF_SIZE;
    this.radius = sideLength / CANVAS_VALUES.HALF_SIZE - CANVAS_VALUES.OFFSET;

    this.radiansPerWeight = this.utility.getRadiansPerWeight(
      this.sectorsOptions
    );

    this.startAngle = this.utility.toRadians(-BASE_ANGLES.DEGREES.QUARTER);

    this.spinning = false;

    this.drawPicker();
  }

  public spin(duration: number): void {
    if (this.spinning) {
      return;
    }

    this.spinning = true;

    let spinStartTime: number | null = null;

    const currentDuration = duration * ANIMATION_VALUES.MILLISECONDS_PER_SECOND;

    const randomAngle = this.utility.getRandomEndAngle();

    const totalTurns =
      (currentDuration / ANIMATION_VALUES.MILLISECONDS_PER_SECOND) *
      ANIMATION_VALUES.FULL_TURNS_PER_SECOND;
    const totalAngle = totalTurns * BASE_ANGLES.DEGREES.FULL_TURN + randomAngle;

    const animate = (timestamp: number): void => {
      if (spinStartTime === null) {
        spinStartTime = timestamp;
      }

      const elapsedTime = timestamp - spinStartTime;

      let currentProgress = Math.min(
        elapsedTime / currentDuration,
        ANIMATION_VALUES.FULL_PROGRESS
      );

      currentProgress = this.utility.easeInOutCirc(currentProgress);

      this.startAngle = this.utility.toRadians(
        currentProgress * totalAngle - BASE_ANGLES.DEGREES.QUARTER
      );

      this.drawPicker();
      this.onSectorChange(this.logCurrentSector());

      if (elapsedTime < currentDuration) {
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
    this.ctx.lineWidth = CANVAS_VALUES.SEGMENTS_STROKE;
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
        this.radius -
          CANVAS_VALUES.OUTER_CIRCLE_STROKE / CANVAS_VALUES.HALF_SIZE,
        startAngle,
        endAngle
      );
      this.ctx.closePath();
      this.ctx.fillStyle = option.color;
      this.ctx.fill();
      this.ctx.stroke();

      const middleAngle = startAngle + sectorAngle / CANVAS_VALUES.HALF_SIZE;

      if (sectorAngle > CANVAS_VALUES.SUFFICIENT_ANGLE) {
        this.drawOptionTitle(middleAngle, option.title);
      }

      startAngle = endAngle;
    }
  }

  private drawPickerMount(): void {
    this.ctx.clearRect(
      CANVAS_VALUES.ZERO_COORDINATE,
      CANVAS_VALUES.ZERO_COORDINATE,
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

    this.ctx.lineWidth = CANVAS_VALUES.OUTER_CIRCLE_STROKE;
    this.ctx.strokeStyle = APP_COLORS.PRIMARY;
    this.ctx.stroke();
  }

  private drawOptionTitle(middleAngle: number, title: string): void {
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(middleAngle);

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = CANVAS_VALUES.TITLE_FONT;
    this.ctx.fillStyle = APP_COLORS.PRIMARY;
    this.ctx.strokeStyle = APP_COLORS.WHITE;
    this.ctx.lineWidth = CANVAS_VALUES.TITLE_STROKE_WIDTH;

    const formattedTitle = this.utility.formatTitle(title);

    this.ctx.strokeText(
      formattedTitle,
      CANVAS_VALUES.TITLE_X_COORDINATE,
      CANVAS_VALUES.TITLE_Y_COORDINATE
    );
    this.ctx.fillText(
      formattedTitle,
      CANVAS_VALUES.TITLE_X_COORDINATE,
      CANVAS_VALUES.TITLE_Y_COORDINATE
    );

    this.ctx.restore();
  }

  private drawCenterElement(): void {
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      CANVAS_VALUES.OFFSET,
      this.utility.toRadians(BASE_ANGLES.DEGREES.ZERO),
      this.utility.toRadians(BASE_ANGLES.DEGREES.FULL_TURN)
    );

    this.ctx.fillStyle = APP_COLORS.WHITE;
    this.ctx.fill();

    this.ctx.lineWidth = CANVAS_VALUES.INNER_CIRCLE_STROKE;
    this.ctx.strokeStyle = APP_COLORS.PRIMARY;
    this.ctx.stroke();
  }

  private drawPointer(): void {
    const pointerX1 = this.centerX - CANVAS_VALUES.POINTER_WIDTH;
    const pointerX2 = this.centerX + CANVAS_VALUES.POINTER_WIDTH;
    const pointerY =
      this.centerY -
      this.radius -
      CANVAS_VALUES.POINTER_HEIGHT +
      CANVAS_VALUES.POINTER_OVERLAP;

    this.ctx.beginPath();
    this.ctx.moveTo(pointerX1, pointerY);
    this.ctx.lineTo(pointerX2, pointerY);
    this.ctx.lineTo(
      this.centerX,
      this.centerY - this.radius + CANVAS_VALUES.POINTER_OVERLAP
    );
    this.ctx.closePath();

    this.ctx.fillStyle = APP_COLORS.WHITE;
    this.ctx.fill();

    this.ctx.lineWidth = CANVAS_VALUES.POINTER_STROKE_WIDTH;
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

    return CANVAS_VALUES.EMPTY_TITLE_VALUE;
  }
}
