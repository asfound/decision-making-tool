import { canvas } from '~/utils/create-element';
import { assertNotNull } from '~/utils/type-guards';

import { View } from '../view';
import { APP_COLORS } from './constants';
import { BASE_ANGLES } from './constants';
import { PickerUtility } from './picker-utility';

const VALUES = {
  HALF_SIZE: 2,
  OFFSET: 20,

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

    this.width = sideLength;
    this.height = sideLength;

    this.view = this.createHTML();
    assertNotNull(this.view);

    const context = this.view.getContext('2d');
    assertNotNull(context);

    this.ctx = context;

    this.centerX = this.view.width / VALUES.HALF_SIZE;
    this.centerY = this.view.height / VALUES.HALF_SIZE;
    this.radius = this.width / VALUES.HALF_SIZE - VALUES.OFFSET;

    this.drawPiker();
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

    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = APP_COLORS.PRIMARY_COLOR;
    this.ctx.stroke();

    this.ctx.fillStyle = this.utility.getRandomColor();
    this.ctx.fill();
  }
}
