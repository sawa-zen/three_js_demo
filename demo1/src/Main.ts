import Camera from './Camera';

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
    this._renderer.setPixelRatio(window.devicePixelRatio/2);
    document.body.appendChild(this._renderer.domElement);

    // 環境光
    let light = new THREE.DirectionalLight(0x999999, 1.6);
    light.castShadow = true;
    this._scene.add(light);

    // 地面
    let planeTexture = THREE.ImageUtils.loadTexture("assets/texture/tile.png");
    planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
    planeTexture.repeat.set(16, 16);
    let planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    let planeMaterial = new THREE.MeshPhongMaterial({
      map: planeTexture,
      bumpMap: planeTexture,
      bumpScale: 0.2,
      shininess: 3,
      specularMap: planeTexture,
      side: THREE.DoubleSide
    });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = 90 * Math.PI / 180;
    plane.receiveShadow = true;
    this._scene.add(plane);


    // モデル
    let group = new THREE.Object3D();
    let loader = new THREE.JSONLoader();
    loader.load( 'assets/obj/sawazen2.json', ( geometry, materials ) => {
      console.log(materials);
      let faceMaterial = new THREE.MeshFaceMaterial(materials);
      let json = new THREE.Mesh( geometry, faceMaterial );
      json.castShadow = true;
      json.scale.set(2, 2, 2);
      group.add(json);
      this._scene.add(group);
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
