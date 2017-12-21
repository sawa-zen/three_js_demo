import * as THREE from 'three';
import Viecle from './Viecle';

/**
 * ターゲットクラス
 */
export default class Target extends Viecle {

  /** 半径 */
  static RADIUS = 15;
  /** スピード */
  static SPEED = 3;
  /** インスタンス */
  static _instance;
  static get instance() {
    return Target._instance || new Target();
  }

  /** 角度 */
  _angle = 0;

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {
    super();
    // 位置を初期化
    this._updatePosition();

    Target._instance = this;
  }

  /**
   * 角度と半径から位置を計算し更新します。
   */
  _updatePosition() {
    let rad = this._angle * Math.PI / 180;
    this._position.x = Target.RADIUS * Math.cos(rad);
    this._position.z = Target.RADIUS * Math.sin(rad);
    this._position.y = 30 * Math.sin(rad * 0.5);
  }

  /**
   * 更新
   */
  update() {
    // 角度を更新
    this._angle += Target.SPEED;
    // 位置を更新
    this._updatePosition();
  }
}
