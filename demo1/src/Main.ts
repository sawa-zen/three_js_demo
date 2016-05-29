import Camera from './Camera';
import Plane from './Plane';
import Model from './Model';

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
    document.body.appendChild(this._renderer.domElement);

    // 環境光
    let light = new THREE.DirectionalLight(0x999999, 1);
    this._scene.add(light);

    // スポットライト
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 10, 50, 30 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    this._scene.add( spotLight );

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

    this._tick();
  }

  /**
   * フレーム毎のアニメーションの更新をかけます。
   */
  private _tick() {
    requestAnimationFrame(() => { this._tick() });

    // カメラの更新
    this._camera.update();

    this._renderer.render(this._scene, this._camera);
  }

  /**
   * モデル読み込み完了時のハンドラーです。
   */
  protected _onLoadModel(geometry:THREE.Geometry, materials:Array<THREE.MeshBasicMaterial>) {
    this._chara = new Model(geometry, materials);
    this._chara.scale.set(10, 10, 10);
    this._chara.castShadow = true;
    this._chara.receiveShadow = true;
    this._scene.add(this._chara);
  }

}
