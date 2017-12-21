import * as THREE from 'three';
import DeviceStore from '../../stores/DeviceStore';

/**
 * カメラのクラスです。
 */
export default class Camera extends THREE.PerspectiveCamera {

  /** 中心点 */
  static CENTER_POINT = new THREE.Vector3();

  /** 角度 */
  _angle = 0;
  get angle() { return this._angle; }
  /**
   * コンストラクターです。
   * @constructor
   */
  constructor() {
    super(
      45,
      DeviceStore.instance.canvasW / DeviceStore.instance.canvasH,
      1,
      500
    );

    this._onResize = this._onResize.bind(this);

    // 半径
    this._radius = Math.random() * 80 + 30;
    // スピード
    this._speed = Math.random() * 0.7 + 0.3;

    // リサイズを監視
    DeviceStore.instance.on('resize', this._onResize);
  }

  /**
   * 毎フレームの更新をかけます。
   */
  update(target) {
    this._angle += this._speed;

    let rad = this._angle * Math.PI / 180;
    this.position.x = this._radius * Math.cos(rad);
    this.position.y = this._radius * Math.sin(rad);

    this.lookAt(Camera.CENTER_POINT);
  }

  /**
   * リサイズ時のハンドラーです。
   */
  _onResize() {
    this.aspect = DeviceStore.instance.canvasW / DeviceStore.instance.canvasH;
    this.updateProjectionMatrix();
  }
}
