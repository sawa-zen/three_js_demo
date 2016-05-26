import Camera from './Camera';
import Plane from './Plane';

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
    this._renderer.setPixelRatio(window.devicePixelRatio / 2);
    document.body.appendChild(this._renderer.domElement);

    // 環境光
    let light = new THREE.DirectionalLight(0x999999, 1.6);
    light.castShadow = true;
    this._scene.add(light);

    // 地面
    this._plane = new Plane();
    this._scene.add(this._plane);

    // モデル
    let loader = new THREE.JSONLoader();
    loader.load( 'assets/obj/sawazen2.json', ( geometry, materials ) => {
      let faceMaterial = new THREE.MultiMaterial(materials);
      let json = new THREE.Mesh( geometry, faceMaterial );
      json.castShadow = true;
      json.scale.set(1.5, 1.5, 1.5);
      this._scene.add(json);
    } );


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

}
