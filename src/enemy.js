import Cube from './cube.js';
import Vector2D from './vector2d.js';

export default class Enemy extends Cube {

  /**
   * 初期化
   */
  init() {
    this.MODE_SHEEK = 'seek';
    this._mode = this.MODE_SHEEK;
  }

  /**
   * コンストラクタ
   */
  constructor() {
    super(0xFF00FF);
    this._maxForce = 1;
    this._steeringForce = new Vector2D();
  }

  /**
   *
   */
  set maxForce(value) {
    this._maxForce = value;
  }
  get maxForce() {
    return this._maxForce;
  }

  update() {
    this._steeringForce.truncate(this._maxForce);
    this._steeringForce = this._steeringForce.divide(this._mass);
    this._velocity = this._velocity.add(this._steeringForce);
    this._steeringForce = new Vector2D();
    super.update();
  }

  /**
   * 追求行動
   */
  seek(target) {
    var desiredVelocity = target.subtract(this._position);
    desiredVelocity.normalize();
    desiredVelocity = desiredVelocity.multiply(this._maxSpeed);
    var force = desiredVelocity.subtract(this._velocity);
    this._steeringForce = this._steeringForce.add(force);
  }

}
