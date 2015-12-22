import Player from './player.js';
import Enemy from './enemy.js';
import Vector2D from './vector2d.js';

class App {

  /**
   * コンストラクタ
   */
  constructor() {
    this.stage = document.getElementById('stage');
    this.stageWidth = 800;
    this.stageHeight = 500;
  }

  /**
   * 開始
   */
  start() {

    // シーン
    this.scene = new THREE.Scene();

    // 地面
    var pgeometry = new THREE.PlaneGeometry(1000, 1000);
    var pmaterial = new THREE.MeshLambertMaterial({
      color: 'lightgreen',
      side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(pgeometry, pmaterial);
    plane.receiveShadow = true;
    plane.position.set(0, 0, 0);
    plane.rotation.x = 90 * Math.PI / 180;
    this.scene.add(plane);


    // 環境光
    this.light = new THREE.DirectionalLight('white', 1);
    this.light.position.set(0, 0, 0);
    this.light.castShadow = true;
    this.scene.add(this.light);


    // スポットライト
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(100, 4000, 100);
    this.spotLight.castShadow = true;//影
    this.scene.add(this.spotLight);


    // カメラ
    this.camera = new THREE.PerspectiveCamera(
      45, this.stageWidth / this.stageHeight, 1, 2000
    );
    this.camera.position.set(1000, 1000, 0);
    this.camera.lookAt({x: 0, y: 0, z: 0});


    // ヘルパー
    var axis = new THREE.AxisHelper(1000);
    axis.position.set(0, 0, 0);
    this.scene.add(axis);


    // レンダラー
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.stageWidth, this.stageHeight);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.shadowMap.enabled = true;
    this.stage.appendChild(this.renderer.domElement);

    // プレイヤー
    this.player = new Player();
    this.player.velocity = new Vector2D(30, 20);
    this.scene.add(this.player);

    // 敵
    this.enemy = new Enemy();
    this.enemy.pos = new Vector2D(-200, 300);
    this.player.velocity = new Vector2D(20, 30);
    this.scene.add(this.enemy);

    // フレーム毎のレンダーを登録
    this.render();
  }


  /**
   * 描画
   */
  render() {
    requestAnimationFrame(_.bind(this.render, this));
    this.player.update();
    this.enemy.seek(this.player.pos);
    this.enemy.update();
    this.renderer.render(this.scene, this.camera);
  }


}
var app = new App();
app.start();
