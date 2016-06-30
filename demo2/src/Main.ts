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
  /** canvasを追加するDOM */
  private _renderDom:HTMLElement;

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
    this._camera = new Camera();

    // レンダラー
    this._renderDom = document.getElementById('renderCanvas');
    this._renderer = new THREE.WebGLRenderer({antialias: true});
    this._renderer.setClearColor(0x83a3b7);
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._resize();
    this._renderDom.appendChild(this._renderer.domElement);

    // 環境光
    let light = new THREE.DirectionalLight(0xffffff, 1);
    this._scene.add(light);

    // スポットライト
    this._spotLight = SpotLight.getInstance();
    //this._scene.add(this._spotLight);

    // 地面
    this._plane = new Plane();
    this._scene.add(this._plane);

    // モデルのロード
    let loader = new THREE.JSONLoader();
    loader.load(
      'assets/json/zensuke.json',
      (geometry:THREE.Geometry, materials:Array<THREE.MeshBasicMaterial>) => {
        this._onLoadModel(geometry, materials);
      }
    );

    // 左上に表示するようCSSを記述してbody直下に表示
    this._stats = new Stats();
    document.body.appendChild(this._stats.dom);

    // Zenpad
    let zenpad = new Zenpad('myCanvas');
    this._onPushLeft = this._onPushLeft.bind(this)
    this._onPushRight = this._onPushRight.bind(this)
    this._onRelase = this._onRelase.bind(this);
    this._onClickA = this._onClickA.bind(this);
    this._onClickB = this._onClickB.bind(this);
    zenpad.addEventListener('pushLeft', this._onPushLeft);
    zenpad.addEventListener('pushRight', this._onPushRight);
    zenpad.addEventListener('releasePad', this._onRelase);
    zenpad.addEventListener('clickA', this._onClickA);
    zenpad.addEventListener('clickB', this._onClickB);

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
    if(this._moveDirection) {
      this._camera.rotate(this._moveDirection);
    }
    this._camera.update();
    // スポットライトの更新
    this._spotLight.update();

    if(this._chara) {
      // キャラ
      this._chara.update();
    }

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
    this._scene.add(this._chara);
  }

  /**
   * 左スティックに倒れた時
   */
  protected _onPushLeft():boolean {
    this._moveDirection = 'left';
    return true;
  }

  /**
   * 右スティックに倒れた時
   */
  protected _onPushRight():boolean {
    this._moveDirection = 'right';
    return true;
  }

  /**
   * スティックを離した際のハンドラーです。
   */
  protected _onRelase():boolean {
    this._moveDirection = null;
    return true;
  }

  /**
   * Aボタン押下時のハンドラーです。
   */
  protected _onClickA():boolean {
    this._chara.play();
    return true;
  }

  /**
   * Bボタン押下時のハンドラーです。
   */
  protected _onClickB():boolean {
    this._chara.stop();
    return true;
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
    let width = this._renderDom.clientWidth;
    let height = this._renderDom.clientHeight;
    this._renderer.domElement.setAttribute('width', String(width));
    this._renderer.domElement.setAttribute('height', String(height));
    this._renderer.setSize(width, height);
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
  }
}
