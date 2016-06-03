import Camera from './Camera';
import Plane from './Plane';
import Model from './Model';
import SpotLight from './SpotLight';

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
  /** 地面オブジェクトです。 */
  private _plane:Plane;
  /** モデルオブジェクトです。 */
  private _chara:Model;
  /** スポットライトオブジェクトです。 */
  private _spotLight:SpotLight;
  /** レンダラーオブジェクトです。 */
  private _renderer:THREE.WebGLRenderer;
  /** FPS表示 */
  private _stats:Stats;

  /** フレームカウント */
  private _frame:number = 0;

  /**
   * コンストラクターです。
   * @constructor
   */
  constructor() {
    // シーン
    this._scene = new THREE.Scene();

    // カメラ
    this._camera = new Camera();

    // レンダラー
    this._renderer = new THREE.WebGLRenderer({antialias: true});
    this._renderer.setClearColor(0x83a3b7);
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.shadowMap.enabled = true;
    this._renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(this._renderer.domElement);

    // 環境光
    let light = new THREE.DirectionalLight(0x999999, 1);
    this._scene.add(light);

    // スポットライト
    this._spotLight = SpotLight.getInstance();
    this._scene.add(this._spotLight);

    // 地面
    this._plane = new Plane();
    this._scene.add(this._plane);

    // モデルのロード
    let loader = new THREE.JSONLoader();
    loader.load(
      'assets/json/sawazen2.json',
      (geometry:THREE.Geometry, materials:Array<THREE.MeshBasicMaterial>) => {
        this._onLoadModel(geometry, materials);
      }
    );

    // ドラック
    //window.addEventListener('mousemove', (event) => this._onMouseMove(event));

    // 左上に表示するようCSSを記述してbody直下に表示
    this._stats = new Stats();
    document.body.appendChild(this._stats.dom);

    this._tick();
  }

  /**
   * フレーム毎のアニメーションの更新をかけます。
   */
  private _tick() {
    requestAnimationFrame(() => { this._tick() });

    // フレームカウントをインクリメント
    this._frame++;

    // カメラの更新
    this._camera.lotation();
    this._camera.update();
    // スポットライトの更新
    this._spotLight.update();

    // FPSを30に
    if(this._frame % 2) {
      return;
    }

    // Statsの計測を開始
    this._stats.begin();
    // 描画
    this._renderer.render(this._scene, this._camera);
    // Statsの計測終了
    this._stats.end();
  }

  /**
   * モデル読み込み完了時のハンドラーです。
   */
  protected _onLoadModel(geometry:THREE.Geometry, materials:Array<THREE.MeshBasicMaterial>):void {
    this._chara = new Model(geometry, materials);
    this._chara.scale.set(10, 10, 10);
    this._chara.castShadow = true;
    this._chara.receiveShadow = true;
    this._scene.add(this._chara);
  }

  /**
   * マウスムーブ時のハンドラーです。
   */
  protected _onMouseMove(event:MouseEvent):void {
    this._camera.lotation();
  }

}
