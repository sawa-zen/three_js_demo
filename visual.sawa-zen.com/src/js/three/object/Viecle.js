import * as THREE from 'three';

/**
 * Viecleクラス
 */
export default class Viecle {

  /** 0地点 */
  static ZERO_VECTOR = new THREE.Vector3();

  /** 最高スピード */
  _maxSpeed = 0.5;
  set maxSpeed(maxSpeed) { this._maxSpeed = maxSpeed; }
  /** 最大の力 */
  _maxForce = 1;
  /** 最終的にかかる力 */
  _steeringForce = new THREE.Vector3();
  /** 速度 */
  _velocity = new THREE.Vector3(0, 1, 0);
  get velocity() { return this._velocity; }
  /** 位置 */
  _position = new THREE.Vector3();
  get position() { return this._position; }
  /** 質量 */
  _mass = 11.5;
  get mass() { return this._mass; }
  /** 到着のしきい値 */
  _arrivalThreshold = 10;

  /**
   * 追跡行動
   */
  seek(targetPoint) {
    targetPoint = targetPoint.clone();
    let desiredVelocity = targetPoint.sub(this._position);
    desiredVelocity.normalize();
    desiredVelocity.multiplyScalar(this._maxSpeed);
    let force = desiredVelocity.sub(this._velocity);
    this._steeringForce.add(force);
  }

  /**
   * 到着行動
   */
  arrive(targetPoint) {
    let targetP = targetPoint.clone();
    let desiredVelocity = targetP.clone().sub(this._position);
    desiredVelocity.normalize();

    let dist = this._position.distanceTo(targetP);
    if(dist > this._arrivalThreshold) {
      desiredVelocity.multiplyScalar(this._maxSpeed);
    } else {
      desiredVelocity.multiplyScalar(this._maxSpeed * dist / this._arrivalThreshold);
    }

    let force = desiredVelocity.sub(this._velocity);
    this._steeringForce.add(force);
  }

  /**
   * 逃避行動
   */
  flee(targetPoint) {
    targetPoint = targetPoint.clone();
    let desiredVelocity = targetPoint.sub(this._position);
    desiredVelocity.normalize();
    desiredVelocity.multiplyScalar(this._maxSpeed);
    let force = desiredVelocity.sub(this._velocity);
    this._steeringForce.sub(force);
  }

  /**
   * 更新
   */
  update() {
    this._truncate(this._steeringForce, this._maxForce);
    this._steeringForce.divideScalar(this._mass);
    this._velocity.add(this._steeringForce);

    this._steeringForce.set(0, 0, 0);

    // 速度をスピード内に収める
    this._truncate(this._velocity, this._maxSpeed);
    // 速度を位置に足す
    this._position.add(this._velocity);
  }

  _truncate(vector, max) {
    let length = vector.length();
    let min = Math.min(length, max);
    vector.setLength(min);
  }
}
