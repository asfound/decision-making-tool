/* eslint-disable max-lines-per-function */
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
};

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
  private readonly startAngle: number;
  private readonly sectorsOptions: OptionData[];

  public constructor(sideLength: number, optionsData: OptionData[]) {
    super();

    this.utility = new PickerUtility();

    this.sectorsOptions = this.utility.shuffleOptions(optionsData);

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

    this.drawPiker();

    this.drawCenterElement();
  }

  protected createHTML(): HTMLCanvasElement {
    const canvasElement = canvas({});

    canvasElement.width = this.width;
    canvasElement.height = this.height;

    return canvasElement;
  }

  private drawPiker(): void {
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
      this.utility.toRadians(BASE_ANGLES.DEGREES.FULL)
    );

    const OUTER_CIRCLE_STROKE = 10;
    this.ctx.lineWidth = OUTER_CIRCLE_STROKE;
    this.ctx.strokeStyle = APP_COLORS.PRIMARY;
    this.ctx.stroke();

    //TODO remove comment
    // ============== SEGMENTS ==============
    const SEGMENTS_STROKE = 2;

    this.ctx.lineWidth = SEGMENTS_STROKE;
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
        this.radius - OUTER_CIRCLE_STROKE / VALUES.HALF_SIZE,
        startAngle,
        endAngle
      );
      this.ctx.closePath();
      this.ctx.fillStyle = this.utility.getRandomColor();
      this.ctx.fill();
      this.ctx.stroke();

      startAngle = endAngle;
    }
  }

  private drawCenterElement(): void {
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      VALUES.OFFSET,
      this.utility.toRadians(BASE_ANGLES.DEGREES.ZERO),
      this.utility.toRadians(BASE_ANGLES.DEGREES.FULL)
    );

    this.ctx.fillStyle = APP_COLORS.WHITE;
    this.ctx.fill();

    const INNER_CIRCLE_STROKE = 7;
    this.ctx.lineWidth = INNER_CIRCLE_STROKE;
    this.ctx.strokeStyle = APP_COLORS.PRIMARY;
    this.ctx.stroke();
  }
}
