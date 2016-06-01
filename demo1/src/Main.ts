import Camera from './Camera';
import Plane from './Plane';
import Model from './Model';
import SpotLight from './SpotLight';

window.addEventListener('load', () => {
  new Main();
});

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
    this._renderer.shadowMapEnabled = true;
    document.body.appendChild(this._renderer.domElement);

    // 環境光
    let light = new THREE.DirectionalLight(0x999999, 1);
    this._scene.add(light);

    // スポットライト
    this._spotLight = SpotLight.getInstance();
    this._scene.add(this._spotLight);

    // 地面
    this._plane = new Plane();
    this._plane.receiveShadow = true;
    this._plane.castShadow = true;
    this._scene.add(this._plane);

    // モデルのロード
    let loader = new THREE.JSONLoader();
    loader.load(
      'assets/obj/sawazen2.json',
      (geometry:THREE.Geometry, materials:Array<THREE.MeshBasicMaterial>) => {
        this._onLoadModel(geometry, materials);
      }
    );

    // ドラック
    window.addEventListener('mousemove', (event) => this._onMouseMove(event));

    this._tick();
  }

  /**
   * フレーム毎のアニメーションの更新をかけます。
   */
  private _tick() {
    requestAnimationFrame(() => { this._tick() });

    // カメラの更新
    this._camera.update();
    // スポットライトの更新
    this._spotLight.update();

    this._renderer.render(this._scene, this._camera);
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
