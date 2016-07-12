import Camera from './Camera';

import ArrowHelper from './helper/ArrowHelper';
import AxisHelper from './helper/AxisHelper';

window.addEventListener('load', () => {
  new Main();
});

document.addEventListener('touchmove', function(e) {
  if (window.innerHeight >= document.body.scrollHeight) {
    e.preventDefault();
  }
}, false);

/**
 * デモのメインクラスです。
 */
class Main {

  /** シーンオブジェクトです。 */
  private _scene:THREE.Scene;
  /** カメラオブジェクトです。 */
  private _camera:Camera;
  /** レンダラーオブジェクトです。 */
  private _renderer:THREE.WebGLRenderer;
  /** FPS表示 */
  private _stats:Stats;

  /** フレームカウント */
  private _frame:number = 0;
  /** カメラの移動向き */
  private _moveDirection:string;

  /**
   * コンストラクターです。
   * @constructor
   */
  constructor() {

    // シーン
    this._scene = new THREE.Scene();

    // カメラ
    this._camera = Camera.getInstance();

    // レンダラー
    this._renderer = new THREE.WebGLRenderer({antialias: true});
    this._renderer.setClearColor(0x000000);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._resize();
    document.body.appendChild(this._renderer.domElement);

    // // 矢印ヘルパー
    // let arrowHelper = new ArrowHelper();
    // this._scene.add(arrowHelper);
    // 三軸ヘルパー
    let axisHelper = new AxisHelper();
    this._scene.add(axisHelper);

    // 更新処理
    this._tick();

    // リサイズを監視
    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);
  }

  /**
   * フレーム毎のアニメーションの更新をかけます。
   */
  private _tick() {
    requestAnimationFrame(() => { this._tick() });

    // フレームカウントをインクリメント
    this._frame++;

    // カメラの更新
    this._camera.rotate();
    this._camera.update();

    // FPSを30に
    if(this._frame % 2) {
      return;
    }

    // 描画
    this._renderer.render(this._scene, this._camera);
  }

  /**
   * リサイズ時のハンドラーです。
   */
  protected _onResize(event:Event):void {
    this._resize();
  }

  /**
   * リサイズ処理
   */
  private _resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    this._renderer.domElement.setAttribute('width', String(width));
    this._renderer.domElement.setAttribute('height', String(height));
    this._renderer.setSize(width, height);
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
  }
}
