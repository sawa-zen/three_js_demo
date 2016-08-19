import Camera from './Camera';
import Plane from './Plane';

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

  /** box2dワールド */
  private _b2world:Box2D.Dynamics.b2World;

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

    // 地面
    let plane = new Plane();
    plane.position.y = -2;
    this._scene.add(plane);

      // 左上に表示するようCSSを記述してbody直下に表示
    this._stats = new Stats();
    document.body.appendChild(this._stats.dom);

    this._tick();

    // リサイズを監視
    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);

    this._b2world = new Box2D.Dynamics.b2World(
      new Box2D.Common.Math.b2Vec2(0, 9.8),
      true
    );

    var fixDef = new Box2D.Dynamics.b2FixtureDef; // 入れ物生成
    fixDef.density = 1.0; // 密度
    fixDef.friction = 0.5; // 摩擦係数
    fixDef.restitution = 0.2; // 反発係数

    // 30行目から一番下のラインを引きます
    var bodyDef = new Box2D.Dynamics.b2BodyDef; // 物体を宣言

    // これは一番下のラインなので動かない
    bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody; // 動くやつはb2_dynamicBody
    fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape; // 今回は四角形

    // 縦1pxのラインを引く
    bodyDef.position.Set(0 , 400 / 30); // xとy
    this._b2world.CreateBody(bodyDef).CreateFixture(fixDef); // 世界に突っ込む

    // 43行目
    var debugDraw = new Box2D.Dynamics.b2DebugDraw(); // debug用オブジェクト
    debugDraw.SetSprite(this._renderer.domElement.getContext("2d")); // 描画するcanvasを設定
    debugDraw.SetDrawScale(30); // この世界のスケールを設定
    debugDraw.SetFillAlpha(0.5); // 要素の透過度を設定
    debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit); // 表示する内容を定数で指定
    this._b2world.SetDebugDraw(debugDraw); // 世界にdebug要素を突っ込む
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

    // FPSを30に
    if(this._frame % 2) {
      return;
    }

    // Statsの計測を開始
    this._stats.begin();
    // 描画
    //this._renderer.render(this._scene, this._camera);
    // Statsの計測終了
    this._stats.end();
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
    //this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
  }
}
