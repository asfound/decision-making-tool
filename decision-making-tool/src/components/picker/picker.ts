import { canvas } from '~/utils/create-element';
import { assertNotNull } from '~/utils/type-guards';

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

  public constructor(sideLength: number) {
    super();

    this.utility = new PickerUtility();

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

    // this.segments = []

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
      this.utility.toRadians(BASE_ANGLES.DEGREES_0),
      this.utility.toRadians(BASE_ANGLES.DEGREES_360)
    );

    const OUTER_CIRCLE_STROKE = 10;
    this.ctx.lineWidth = OUTER_CIRCLE_STROKE;
    this.ctx.strokeStyle = APP_COLORS.PRIMARY_COLOR;
    this.ctx.stroke();

    const SEGMENTS_STROKE = 3;
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      this.radius - OUTER_CIRCLE_STROKE / VALUES.HALF_SIZE,
      this.utility.toRadians(BASE_ANGLES.DEGREES_0),
      this.utility.toRadians(BASE_ANGLES.DEGREES_360)
    );

    this.ctx.lineWidth = SEGMENTS_STROKE;
    this.ctx.strokeStyle = APP_COLORS.WHITE;
    this.ctx.stroke();

    this.ctx.fillStyle = this.utility.getRandomColor();
    this.ctx.fill();
  }

  private drawCenterElement(): void {
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX,
      this.centerY,
      VALUES.OFFSET,
      this.utility.toRadians(BASE_ANGLES.DEGREES_0),
      this.utility.toRadians(BASE_ANGLES.DEGREES_360)
    );

    this.ctx.fillStyle = APP_COLORS.WHITE;
    this.ctx.fill();
  }
}
