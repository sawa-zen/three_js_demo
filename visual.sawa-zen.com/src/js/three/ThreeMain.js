import * as THREE from 'three';
import DeviceStore from '../stores/DeviceStore';
import MainScene from './scene/MainScene';
import CameraManager from './manager/CameraManager';
import * as DeviceUtil from '../utils/DeviceUtil';

/**
 * Three.jsアニメーションメインクラスです。
 */
export default class ThreeMain {

  /**
   * コンストラクター
   * @constructor
   */
  constructor() {

    this._onResize = this._onResize.bind(this);

    // DOM
    this._wrapper = document.getElementById('MainVisualThree');

    // シーン
    this._scene = new MainScene();

    // カメラマネージャー
    this._cameraManager = new CameraManager();

    // レンダラー
    this._renderer = new THREE.WebGLRenderer({antialias: !DeviceUtil.isLasyDevice()});
    this._renderer.setClearColor(0xF5F5F5);
    this._renderer.setPixelRatio(DeviceUtil.getPixelRatio());
    this._renderer.shadowMap.enabled = true;
    this._wrapper.appendChild(this._renderer.domElement);

    // リサイズ
    this._onResize();
    DeviceStore.instance.on('resize', this._onResize);
  }

  /**
   * 更新します。
   */
  update() {
    // シーンを更新
    this._scene.update();

    // カメラマネージャーを更新
    this._cameraManager.update();

    // 描画
    this._renderer.render(this._scene, this._cameraManager.current);
  }

  /**
   * リサイズをかけます。
   */
  _onResize() {
    let width = DeviceStore.instance.canvasW;
    let height = DeviceStore.instance.canvasH;
    this._renderer.domElement.setAttribute('width', String(width));
    this._renderer.domElement.setAttribute('height', String(height));
    this._renderer.setSize(width, height);
  }
}
