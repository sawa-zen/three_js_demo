import Camera from './Camera';

import ArrowHelper from './helper/ArrowHelper';
import AxisHelper from './helper/AxisHelper';
import BoundingBoxHelper from './helper/BoundingBoxHelper';
import BoxHelper from './helper/BoxHelper';
import CameraHelper from './helper/CameraHelper';
import DirectionalLightHelper from './helper/DirectionalLightHelper';
import EdgesHelper from './helper/EdgesHelper';
import FaceNormalsHelper from './helper/FaceNormalsHelper';
import GridHelper from './helper/GridHelper';
import VertexNormalsHelper from './helper/VertexNormalsHelper';

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

    // 環境光
    let ambientLight = new THREE.AmbientLight(0x333333);
    this._scene.add(ambientLight);

    // 平行光源
    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 0);
    this._scene.add(directionalLight);

    // // 矢印ヘルパー
    // let arrowHelper = new ArrowHelper();
    // this._scene.add(arrowHelper);
    // // 三軸ヘルパー
    // let axisHelper = new AxisHelper();
    // this._scene.add(axisHelper);
    // // 境界エリアヘルパー
    // let boundingBoxHelper = new BoundingBoxHelper();
    // this._scene.add(boundingBoxHelper);
    // // ボックスヘルパー
    // let boxHelper = new BoxHelper();
    // this._scene.add(boxHelper);
    // // カメラヘルパー
    // let cameraHelper = new CameraHelper();
    // cameraHelper.position.z = 1.5;
    // this._scene.add(cameraHelper);
    // // 平行光源ヘルパー
    // let directionalLightHelper = new DirectionalLightHelper();
    // this._scene.add(directionalLightHelper);
    // // エッジヘルパー
    // let edgeHelper = new EdgesHelper();
    // this._scene.add(edgeHelper);
    // // 面法線ヘルパー
    // let faceNormalHelper = new FaceNormalsHelper();
    // this._scene.add(faceNormalHelper);
    // // グリッドヘルパー
    // let gridHelper = new GridHelper();
    // this._scene.add(gridHelper);
    // 頂点ヘルパー
    let vertexNormalHelper = new VertexNormalsHelper();
    this._scene.add(vertexNormalHelper);

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
